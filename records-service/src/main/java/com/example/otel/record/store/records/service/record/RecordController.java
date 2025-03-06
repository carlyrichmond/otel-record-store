package com.example.otel.record.store.records.service.record;

import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.trace.SpanKind;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.context.Scope;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
@RequestMapping("/records")
public class RecordController {

    private static Logger logger = LogManager.getLogger(RecordController.class);
    private final Tracer tracer;
    private final String SERVICE_NAME = System.getenv("OTEL_SERVICE_NAME");
    private final RecordRepository recordRepository;

    public RecordController(OpenTelemetry openTelemetry, RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
        this.tracer = openTelemetry.getTracer(SERVICE_NAME, "1.0.0");
    }

    @GetMapping
    private Flux<MusicRecord> getAllRecords() throws InterruptedException {
        Span span = tracer.spanBuilder("GET records/custom").setSpanKind(SpanKind.SERVER).startSpan();
        span.setAttribute("http.method", "GET");
        span.setAttribute("http.url", "/records/custom");
        span.setAttribute("http.response.status_code", "200");


        try (Scope scope = span.makeCurrent()) {
            logger.info("Waiting...");
            //Thread.sleep(10000);

            logger.info("Getting all records");
            return recordRepository.findAllRecords();
        } catch(Throwable t) {
            span.recordException(t);
            throw t;
        } finally {
            span.end();
        }
    }

    @GetMapping("/{query}")
    private Flux<MusicRecord> getRecordByQuery(@PathVariable String query) throws InterruptedException {
        logger.info("Waiting...");
        //Thread.sleep(10000);
        logger.info(String.format("Getting records that match query: %s", query));
        return recordRepository.findRecordsByQuery(query);
    }
}
