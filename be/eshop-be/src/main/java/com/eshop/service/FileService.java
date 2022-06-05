package com.eshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;


@Service
public class FileService {
    @Autowired
    ServletContext app;


    private Path getPath(String folder, String filename){
        File dir = Paths.get(app.getRealPath("/files/" + folder)).toFile();

        if(!dir.exists()){
            dir.mkdirs();
        }

        return Paths.get(dir.getAbsolutePath(), filename);
    }


    public byte[] read(String folder, String filename){
        Path path = this.getPath(folder, filename);

        try{
            return Files.readAllBytes(path);
        }catch(IOException e){
            throw new RuntimeException(e);
        }
    }


    public List<String> save(String folder, MultipartFile[] files){
        List<String> filenames = new ArrayList<String>();

        for (MultipartFile file: files) {
            String name = System.currentTimeMillis() + file.getOriginalFilename();
            String filename = Integer.toHexString(name.hashCode()) + name.substring(name.lastIndexOf("."));
            Path path = this.getPath(folder, filename);
            try{
                file.transferTo(path);
                filenames.add(filename);
            }catch (Exception e){
                throw new RuntimeException(e);
            }
        }

        return filenames;
    }

//    public List<String> upload(String folder, MultipartFile[] files){
//        File dir = new File(app.getRealPath(folder));
//        if(!dir.exists()){
//            dir.mkdir();
//        }
//
//        for (MultipartFile file: files) {
//            File saveFile =
//        }
//    }


    public void delete(String folder, String filename){
        Path path = this.getPath(folder, filename);
        path.toFile().delete();
    }

    public List<String> list(String folder){
        List<String> filenames = new ArrayList<String>();
        File dir = Paths.get(app.getRealPath("/files/"), folder).toFile();

        if(dir.exists()){
            File[] files = dir.listFiles();
            for (File file: files){
                filenames.add(file.getName());
            }
        }

        return filenames;
    }
}
