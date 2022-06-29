package com.bitbalancers.hackathon.util;

public class InsufficientAccessException extends Exception{

    private final String message;

    public InsufficientAccessException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
