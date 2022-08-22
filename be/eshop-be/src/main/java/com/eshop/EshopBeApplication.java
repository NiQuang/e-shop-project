package com.eshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EshopBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(EshopBeApplication.class, args);
    }

}
