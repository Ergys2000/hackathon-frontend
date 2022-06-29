package com.bitbalancers.hackathon.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ResponseManager {
	
	public ResponseEntity<Object> getFormattedResponse(HttpStatus statusCode, String message, Object data) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("message", message);
		map.put("status", statusCode.value());
		map.put("data", data);
		
		return new ResponseEntity<Object>(map, statusCode);
	}

//	public ResponseEntity<Object> getEmailResponse(HttpStatus statusCode, String emailRequest, )


	
}
