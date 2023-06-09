package com.cloud.service.impl;


import com.cloud.base.RestResponse;
import com.cloud.base.Session;
import com.cloud.entity.UserBase;
import com.cloud.service.LoginService;
import com.cloud.service.MailGunService;
import com.cloud.service.VerificationService;
import com.cloud.util.TransUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.Random;


@Service
public class VerificationServiceImpl implements VerificationService {

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    LoginService loginService;

    @Value(value = "${spring.mail.username}")
    String sender;

    @Autowired
    MailGunService mailGunService;


    @Override
    public RestResponse<Object> sendVerificationNumber(String mail) {
        // qq mail
        mail = TransUtils.toLowerCase(mail);
        HttpSession session = Session.getSession();
        session.setAttribute("mail",mail);
        String verificationNumber = getRandomNumber();
        session.setAttribute("verificationNumber",verificationNumber);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Cloud Favorites verification code");
        message.setFrom(sender);
        message.setTo(mail);
        message.setSentDate(new Date());
        message.setText("Hi,\n" + " \n" + "Welcome！\n" + " \n" +
                "Thank you for registering Cloud Favorites. We hope you enjoy it!" +
                "To complete the register, please enter the verification code below.\n" + " \n" +
                "Verification Code:"+verificationNumber+" \n" + " \n" + "Thanks\n" + "");
        try{
            javaMailSender.send(message);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return RestResponse.ok();
    }

    @Override
    public RestResponse<Object> sendVerificationNumberResetPassword(String mail) {
        mail = TransUtils.toLowerCase(mail);
        Session.setMail(mail);
        UserBase user = loginService.getUser(mail);
        if(user == null){
            return RestResponse.error("User not find");
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("XJTLU-OJ verification code");
        message.setFrom(sender);
        message.setTo(mail);
        message.setSentDate(new Date());
        message.setText("Hi,\n" + " \n" + "Welcome！\n" + " \n" +
                "Thank you for visiting XOJ. We hope you enjoy it." +
                "  To reset the password, please enter the verification code below.\n" + " \n" +
                "Verification code:"+getRandomNumber()+" \n" + " \n" + "Thanks,\n" + "XOJ Developer Team");
        try{
            javaMailSender.send(message);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return RestResponse.ok();
    }

    @Override
    public String getRandomNumber() {

        Random random = new Random();
        StringBuilder result= new StringBuilder();
        for (int i=0; i<6; i++) {
            result.append(random.nextInt(10));
        }
        return result.toString();
    }

    @Override
    public RestResponse<Object> sendVerificationNumber(String from, String to) {

        String verificationNumber = getRandomNumber();
        Session.getSession().setAttribute("verificationNumber",verificationNumber);
        String subject = "XJTLU-OJ verification code";
        String body = "Hi,\n" + " \n" + "Welcome！\n" + " \n" +
                "Thank you for visiting XOJ. We hope you enjoy it." +
                "  To reset the password, please enter the verification code below.\n" + " \n" +
                "Verification code: "+verificationNumber+" \n" + " \n" + "Thanks,\n" + "XOJ Developer Team";
        Session.setMail(to);
        try{
            mailGunService.sendText(from, to, subject,body);
            return RestResponse.ok();
        }catch (Exception e){
            return RestResponse.error();
        }

    }
}
