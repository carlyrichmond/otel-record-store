package com.example.otel.record.store.records.service.record;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Flux;

@Repository
public class RecordRepository {

    private static final List<MusicRecord> RECORD_DATA;
    private static final List<MusicRecordFormat> FORMATS;

    private static Logger logger = LogManager.getLogger(RecordRepository.class);

    static {
        FORMATS = new ArrayList<MusicRecordFormat>();
        FORMATS.add(MusicRecordFormat.CD);
        FORMATS.add(MusicRecordFormat.LP);
        FORMATS.add(MusicRecordFormat.DD);

        RECORD_DATA = new ArrayList<MusicRecord>();
        RECORD_DATA.add(new MusicRecord(1, "Abbey Road", "The Beatles", FORMATS));
        RECORD_DATA.add(new MusicRecord(2, "Sgt Pepper\'s Lonely Hearts Club Band", "The Beatles", FORMATS));
        RECORD_DATA.add(new MusicRecord(3, "True Blue", "Madonna", FORMATS.subList(0, 1)));
        RECORD_DATA.add(new MusicRecord(4, "Born in the USA", "Bruce Springsteen", FORMATS));
        RECORD_DATA.add(new MusicRecord(5, "Grace Jones", "Island Life", FORMATS.subList(0, 0)));
        RECORD_DATA.add(new MusicRecord(6, "The Dark Side of the Moon", "Pink Floyd", FORMATS));
        RECORD_DATA.add(new MusicRecord(7, "Unknown Pleasures", "Joy Division", FORMATS));
        RECORD_DATA.add(new MusicRecord(8, "Rumours", "Fleetwood Mac", FORMATS));
        RECORD_DATA.add(new MusicRecord(9, "Nevermind", "Nirvana", FORMATS.subList(1, 2)));
        RECORD_DATA.add(new MusicRecord(10, "Aladdin Sane", "David Bowie", FORMATS));
        RECORD_DATA.add(new MusicRecord(11, "The Dreaming", "Kate Bush", FORMATS));
        RECORD_DATA.add(new MusicRecord(12, "Definitely Maybe", "Oasis", FORMATS));
        RECORD_DATA.add(new MusicRecord(13, "Sticky Fingers", "The Rolling Stones", FORMATS));
        RECORD_DATA.add(new MusicRecord(14, "Parallel Lines", "Blondie", FORMATS.subList(0, 1)));
        RECORD_DATA.add(new MusicRecord(15, "The Freewheelin\' Bob Dylan", "Bob Dylan", FORMATS.subList(1, 2)));
        RECORD_DATA.add(new MusicRecord(16, "Led Zeppelin", "Led Zeppelin", FORMATS));
        RECORD_DATA.add(new MusicRecord(17, "London Calling", "The Clash", FORMATS));
        RECORD_DATA.add(new MusicRecord(18, "Straight Outta Compton", "NWA", FORMATS.subList(1, 2)));
        RECORD_DATA.add(new MusicRecord(19, "The Ramones", "The Ramones", FORMATS));
        RECORD_DATA.add(new MusicRecord(20, "Ready to Die", "The Notorious BIG", FORMATS));
    }

    public Flux<MusicRecord> findRecordsByQuery(String query) {
        logger.info(String.format("Filtering records matching terms: %s", query));


        return Flux.fromStream(
                RECORD_DATA.stream().
                        filter(x -> x.getArtist().toLowerCase().contains(query)
                                || x.getTitle().toLowerCase().contains(query)));
    }

    public Flux<MusicRecord> findAllRecords() {
        logger.info("Finding all records in catalog");
        return Flux.fromIterable(RECORD_DATA);
    }
}