package com.eshop.service.impl;

import com.eshop.entity.User;
import com.eshop.service.EmailSenderService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {

    private final JavaMailSender mailSender;

    public EmailSenderServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    List<MimeMessage> queue = new ArrayList<>();

    @Override
    public void sendEmail(String to, String subject, String message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setFrom("work.quangni12111@gmail.com");
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);

        this.mailSender.send(simpleMailMessage);
    }



    @Override
    public void pushVerifyMail(User user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String to = user.getEmail();
        String from = "work.quangni12111@gmail.com";
        String senderName = "EShop Ecommerce";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";


        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(from, senderName);
        helper.setTo(to);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFullname());
        String verifyURL = "http://localhost:8080/api/auth/verify?code="+user.getVerificode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);
        queue.add(message);
    }





    @Scheduled(fixedRate = 10*1000, initialDelay = 5000)
    public void run(){
        int success =0, error = 0;
        while (!queue.isEmpty()){
            MimeMessage message = queue.remove(0);
            try{
                mailSender.send(message);
                success++;
            }catch(Exception e){
                error++;
            }
            System.out.printf(">> Send: %d, Error: %d\r\n", success, error);
        }
    }
}