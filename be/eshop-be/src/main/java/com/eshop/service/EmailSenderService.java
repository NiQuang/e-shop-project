package com.eshop.service;

import com.eshop.entity.User;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface EmailSenderService {

    void sendEmail(String to, String subject, String message);

    void sendVerifyMail(User user, String siteURL) throws MessagingException, UnsupportedEncodingException;
}
