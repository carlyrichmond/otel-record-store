package com.example.otel.record.store.records.service.record;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class RecordWebClient {

    private static final Logger LOGGER = LoggerFactory.getLogger(RecordWebClient.class);

    WebClient client = WebClient.create("http://localhost:8080");

    public void consume() {

        Mono<MusicRecord> recordMono = client.get()
                .uri("/records/{id}", "1")
                .retrieve()
                .bodyToMono(MusicRecord.class);

        recordMono.subscribe(record -> LOGGER.info("Record: {}", record));

        Flux<MusicRecord> recordFlux = client.get()
                .uri("/records")
                .retrieve()
                .bodyToFlux(MusicRecord.class);

        recordFlux.subscribe(record -> LOGGER.info("Record: {}", record));
    }
}
