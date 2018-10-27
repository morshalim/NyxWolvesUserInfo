package com.morshalim.webs.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;
import java.text.SimpleDateFormat;
import java.util.regex.Pattern;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CustomJacksonObjectMapper extends ObjectMapper {

	private static final long serialVersionUID = 1L;

	public CustomJacksonObjectMapper() {
		
		this.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
    }
	
    @Override
    public <T> T readValue(InputStream src, JavaType javaType) throws IOException, JsonParseException, JsonMappingException {
                return super.readValue(convertStreamToString(src), javaType);
                //return super.readValue(src, javaType);
    }

    /**
     * Convert Inputstream to String
     * 
     * @param is
     * @return
     * @throws IOException
     */
     public String convertStreamToString(InputStream is) throws IOException {
         if (is != null) {
             Writer writer = new StringWriter();

             char[] buffer = new char[1024];
             try {
	             Reader reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
	             int n;
	             while ((n = reader.read(buffer)) != -1) {
	                         writer.write(buffer, 0, n);
	             }
             } finally {
                 is.close();
             }
             String value =writer.toString();
             
 	        if (value != null) {
	            // NOTE: It's highly recommended to use the ESAPI library and uncomment the following line to
	            // avoid encoded attacks.
	            // value = ESAPI.encoder().canonicalize(value);
	 
	            // Avoid null characters
	            value = value.replaceAll("\0", "");
	 
	            // Remove all sections that match a pattern
	            for (Pattern scriptPattern : XSSPostRequestWrapper.getPatterns()){
	                value = scriptPattern.matcher(value).replaceAll("");
	            }
	        }
	        return value;
         } else {
                 return "";
         }
     }

}
