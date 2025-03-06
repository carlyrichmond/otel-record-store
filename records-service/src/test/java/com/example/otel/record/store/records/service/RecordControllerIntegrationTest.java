package com.example.otel.record.store.records.service;

import com.example.otel.record.store.records.service.record.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.reactive.server.WebTestClient;

import static org.mockito.BDDMockito.given;

import reactor.core.publisher.Flux;

import java.util.ArrayList;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes = RecordsServiceApplication.class)
public class RecordControllerIntegrationTest {

    @Autowired
    private WebTestClient testClient;

    @MockitoBean
    private RecordRepository recordRepository;

    @Test
    void givenQuery_whenGetRecordsByQuery_thenCorrectRecords() {

        ArrayList<MusicRecordFormat> formats = new ArrayList<MusicRecordFormat>();
        formats.add(MusicRecordFormat.CD);
        formats.add(MusicRecordFormat.LP);
        formats.add(MusicRecordFormat.DD);

        ArrayList<MusicRecord> records = new ArrayList<MusicRecord>();
        records.add(new MusicRecord(1, "Hozier", "Hozier", formats));
        records.add(new MusicRecord(2, "Wasteland, Baby!", "Hozier", formats));

        given(recordRepository.findRecordsByQuery("hozier")).willReturn(Flux.fromIterable(records));

        testClient.get()
                .uri("/records/hozier")
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(MusicRecord.class).hasSize(2);
    }

    @Test
    void whenGetAllRecords_thenCorrectRecords() {

        ArrayList<MusicRecordFormat> formats = new ArrayList<MusicRecordFormat>();
        formats.add(MusicRecordFormat.CD);
        formats.add(MusicRecordFormat.LP);

        ArrayList<MusicRecord> records = new ArrayList<MusicRecord>();
        records.add(new MusicRecord(1, "Hozier", "Hozier", formats));
        records.add(new MusicRecord(2, "Wasteland, Baby!", "Hozier", formats));
        records.add(new MusicRecord(3, "Dream your Life Away", "Vance Job"));

        given(recordRepository.findAllRecords()).willReturn(Flux.fromIterable(records));

        testClient.get()
                .uri("/records")
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(MusicRecord.class).hasSize(3);
    }

    @Test
    void whenGetFeaturedRecords_thenCorrectRecords() {

        ArrayList<MusicRecordFormat> formats = new ArrayList<MusicRecordFormat>();
        formats.add(MusicRecordFormat.CD);
        formats.add(MusicRecordFormat.LP);

        ArrayList<MusicRecord> records = new ArrayList<MusicRecord>();

        records.add(new MusicRecord(1, "Hozier", "Hozier", formats));
        records.add(new MusicRecord(2, "Wasteland, Baby!", "Hozier", formats));
        records.add(new MusicRecord(3, "Dream your Life Away", "Vance Joy"));
        records.add(new MusicRecord(4, "This is acting", "Sia"));
        records.add(new MusicRecord(5, "Every Open Eye", "Chvrches"));

        given(recordRepository.findFeaturedRecords()).willReturn(Flux.fromIterable(records));

        testClient.get()
                .uri("/records/featured")
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(MusicRecord.class).hasSize(5);
    }

}

