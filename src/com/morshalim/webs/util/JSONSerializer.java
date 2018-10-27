package com.morshalim.webs.util;

import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

public final class JSONSerializer {
	private static ObjectMapper mapper = new ObjectMapper();

	private JSONSerializer() {
		// Static class no need for instantiation
	}

	/**
	 * Serializes any object to its JSON equivalent string
	 * 
	 * @param obj
	 *            the object to serialize
	 * @return JSON string
	 */
	public static String serializeToJSON(Object obj) {
		StringWriter writer = new StringWriter();
		try {
			mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
			//mapper.configure(SerializationConfig.Feature.WRITE_DATES_AS_TIMESTAMPS, false);
			mapper.writeValue(writer, obj);
			writer.close();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return writer.toString();
	}

	/**
	 * Serializes any object to its JSON equivalent string
	 * 
	 * @param obj
	 *            the object to serialize
	 * @return JSON string
	 */
	public static String serializeToFormatedJSON(Object obj) {
		
		try {
			ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
			String json = ow.writeValueAsString(obj);
			return json;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}	
	/**
	 * Deserializes json string to the specified class object
	 * 
	 * @param str
	 * @param targetClass
	 * @return
	 */
	public static <T> T deserializeFromJSON(String str, Class<T> targetClass) {
		try {
			return mapper.readValue(str, targetClass);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * Return JSON String as a Map
	 * @param str
	 * @return map
	 */
	public static Map<String, Object> getMapFromJSON(String str) {
		try {
			return mapper.readValue(str, Map.class) ;
		}catch(Exception e) {
			throw new RuntimeException(e)  ;
		}
	}
	
}
