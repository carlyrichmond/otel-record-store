package com.example.otel.record.store.records.service.record;

import java.util.ArrayList;
import java.util.List;

public class MusicRecord {

    private int albumId;

    private String title;

    private String artist;

    private List<MusicRecordFormat> formats;

    MusicRecord() {
        this.albumId = 1;
        this.title = "Hozier";
        this.artist = "Hozier";

        this.formats = new ArrayList<MusicRecordFormat>();
        formats.add(MusicRecordFormat.CD);
        formats.add(MusicRecordFormat.LP);
        formats.add(MusicRecordFormat.DD);
    }

    public MusicRecord(int id, String title, String artist) {
        this.albumId = id;
        this.title = title;
        this.artist = artist;
        this.formats = new ArrayList<MusicRecordFormat>();
    }

    public MusicRecord(int id, String title, String artist, List<MusicRecordFormat> formats) {
        this.albumId = id;
        this.title = title;
        this.artist = artist;
        this.formats = formats;
    }

    public int getAlbumId() {
        return this.albumId;
    }

    public void setAlbumId(int id) {
        this.albumId = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return this.artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public List<MusicRecordFormat> getFormats() {
        return this.formats;
    }

    public void setFormats(List<MusicRecordFormat> formats) {
        this.formats = formats;
    }
}