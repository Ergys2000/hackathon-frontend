package com.bitbalancers.hackathon.services;

import com.bitbalancers.hackathon.util.model.MailRequest;
import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private Configuration configuration;
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(MailRequest request) throws Exception {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        String html = request.getContent();
        helper.setTo(request.getEmailTo());
        helper.setText(html, true);
        helper.setSubject(request.getSubject());
        helper.setFrom(request.getEmailFrom());
        javaMailSender.send(message);
    }

    String getEmailContent(MailRequest request) throws IOException, TemplateException {
        StringWriter stringWriter = new StringWriter();
        Map<String, Object> model = new HashMap<>();
        model.put("content", request.getContent());
        configuration.getTemplate("email").process(model, stringWriter);
        return stringWriter.getBuffer().toString();
    }

}
