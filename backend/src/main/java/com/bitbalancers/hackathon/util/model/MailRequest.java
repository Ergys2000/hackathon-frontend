package com.bitbalancers.hackathon.util.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class MailRequest {

    private final String emailTo;
    private final String subject;
    private final String emailFrom;
    private final String content;

}
