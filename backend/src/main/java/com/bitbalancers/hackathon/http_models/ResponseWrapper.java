package com.bitbalancers.hackathon.http_models;

public class ResponseWrapper<T> {

    public enum STATUS_MESSAGE {
        OK,
        ERROR
    }

    private String status;
    private T result;
    private String message;

    public ResponseWrapper(STATUS_MESSAGE status, T result, String message) {
        this.status = status.toString();
        this.result = result;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public T getResult() {
        return result;
    }

    public void setResult(T result) {
        this.result = result;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

