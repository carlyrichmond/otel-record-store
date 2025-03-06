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
        RECORD_DATA.add(new MusicRecord(1, "Europe 72", "Grateful Dead", "https://www.rollingstone.com/wp-content/uploads/2024/06/Grateful-Dead-Europe-72.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(2, "Lil Boat", "Lil Yachty", "https://www.rollingstone.com/wp-content/uploads/2024/06/Lil-Yachty-Lil-Boat-mixtape.jpg?w=150", FORMATS.subList(1, 2)));
        RECORD_DATA.add(new MusicRecord(3, "Metal Box", "Public Image Ltd", "https://www.rollingstone.com/wp-content/uploads/2024/06/PIL-Metal-Box.jpg?w=150", FORMATS.subList(0, 1)));
        RECORD_DATA.add(new MusicRecord(4, "Set If Off", "Offset", "https://www.rollingstone.com/wp-content/uploads/2024/06/Offset-Set-It-Off-.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(5, "The Velvet Rope", "Janet Jackson", "https://www.rollingstone.com/wp-content/uploads/2024/06/Janet-Jackson-The-Velvet-Rope.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(6, "Loveless", "My Bloody Valentine", "https://www.rollingstone.com/wp-content/uploads/2024/06/My-Bloody-Valentine-Loveless.jpg?w=150", FORMATS.subList(0, 1)));
        RECORD_DATA.add(new MusicRecord(7, "Licensed to Ill", "Beastie Boys", "https://www.rollingstone.com/wp-content/uploads/2024/06/Beastie-Boys-License-To-Ill.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(8, "Hejira", "Joni Mitchell", "https://www.rollingstone.com/wp-content/uploads/2024/06/Joni-Mitchell-Hejira.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(9, "Goo", "Sonic Youth", "https://www.rollingstone.com/wp-content/uploads/2024/06/Sonic-Youth-Goo.jpg?w=1000", FORMATS.subList(0, 1)));
        RECORD_DATA.add(new MusicRecord(10, "The Rise and Fall of Ziggy Startdust and the Spiders From Mars", "David Bowie", "https://www.rollingstone.com/wp-content/uploads/2024/06/David-Bowie-Ziggy.jpg?w=150", FORMATS));

        RECORD_DATA.add(new MusicRecord(11, "Sticky Fingers", "The Rolling Stones", "https://www.rollingstone.com/wp-content/uploads/2024/06/Rolling-Stones-Sticky-Fingers.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(12, "Dirty Mind", "Prince", "https://www.rollingstone.com/wp-content/uploads/2024/06/Prince-Dirty-Mind.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(13, "Rumours", "Fleetwood Mac", "https://www.rollingstone.com/wp-content/uploads/2024/06/Fleetwood-Mac-Rumours.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(14, "Ramones", "Ramones", "https://www.rollingstone.com/wp-content/uploads/2024/06/Ramones-Ramones.jpg?w=150", FORMATS.subList(0, 1)));
        RECORD_DATA.add(new MusicRecord(15, "Lil Boat", "Lil Yachty", "https://www.rollingstone.com/wp-content/uploads/2024/06/Lil-Yachty-Lil-Boat-mixtape.jpg?w=150", FORMATS.subList(1, 2)));
        RECORD_DATA.add(new MusicRecord(16, "YHLQMDLG", "Bad Bunny", "https://www.rollingstone.com/wp-content/uploads/2024/06/Bad-Bunny-YHLQMDLG.jpg?w=150", FORMATS.subList(2, 2)));
        RECORD_DATA.add(new MusicRecord(17, "Who's Next", "The Who", "https://www.rollingstone.com/wp-content/uploads/2024/06/1971-Whos-Next.jpg?w=887", FORMATS));
        RECORD_DATA.add(new MusicRecord(18, "Tapestry", "Carole King", "https://www.rollingstone.com/wp-content/uploads/2024/06/Carole-King-Tapestry.jpg?w=150", FORMATS.subList(0, 1)));
        RECORD_DATA.add(new MusicRecord(19, "Lemonade", "Beyoncé", "https://www.rollingstone.com/wp-content/uploads/2024/06/Beyonce-Lemonade.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(20, "Sgt. Pepper's Lonely Hearts Club Band", "The Beatles", "https://www.rollingstone.com/wp-content/uploads/2024/06/Beatles-Sgt.-Pepper.jpg?w=150", FORMATS));

        RECORD_DATA.add(new MusicRecord(21, "The Velvet Underground & Nico", "The Velvet Underground", "https://www.rollingstone.com/wp-content/uploads/2024/06/Velvet-Undergound-Velvet-Underground-and-Nico.jpg?w=150", FORMATS.subList(0, 1)));
        RECORD_DATA.add(new MusicRecord(22, "Nevermind", "Nirvana", "https://www.rollingstone.com/wp-content/uploads/2024/06/Nirvana-Nevermind.jpg?w=150", FORMATS.subList(1, 2)));
        RECORD_DATA.add(new MusicRecord(23, "She's So Unusual", "Cyndi Lauper", "https://www.rollingstone.com/wp-content/uploads/2024/06/Cyndi-Lauper-Shes-So-Unusual-.jpg?w=150", FORMATS.subList(1, 2)));
        RECORD_DATA.add(new MusicRecord(24, "London Calling", "The Clash", "https://www.rollingstone.com/wp-content/uploads/2024/06/The-Clash-London-Calling.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(25, "Horses", "Patti Smith", "https://www.rollingstone.com/wp-content/uploads/2024/06/Patti-Smith-Horses.jpg?w=150", FORMATS.subList(1, 2)));
        RECORD_DATA.add(new MusicRecord(26, "Ready to Die", "The Notorious B.I.G", "https://www.rollingstone.com/wp-content/uploads/2024/06/Notorious-BIG-ready-to-die.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(27, "The Dark Side of the Moon", "Pink Floyd", "https://www.rollingstone.com/wp-content/uploads/2024/06/Pink-Floyd-Dark-Side-of-the-Moon.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(28, "Abbey Road", "The Beatles", "https://www.rollingstone.com/wp-content/uploads/2024/06/Beatles-Abbey-Road.jpg?w=150", FORMATS));
        RECORD_DATA.add(new MusicRecord(29, "Unknown Pleasures", "Joy Division", "https://www.rollingstone.com/wp-content/uploads/2024/06/Joy-Division-Unknown-Pleasures.jpg?w=150", FORMATS.subList(0, 1)));
        RECORD_DATA.add(new MusicRecord(30, "The Freewheelin' Bob Dylan", "Bob Dylan", "https://www.rollingstone.com/wp-content/uploads/2024/06/Bob-Dylan-Freewheelin-Bob-Dylan.jpg?w=150", FORMATS));


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

    public Flux<MusicRecord> findFeaturedRecords() {
        return Flux.fromIterable(RECORD_DATA.subList(5, 10));
    }
}