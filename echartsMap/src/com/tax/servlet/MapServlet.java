package com.tax.servlet;

import java.io.IOException;  
import java.io.PrintWriter;  
  
import javax.servlet.ServletException;  
import javax.servlet.http.HttpServlet;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class MapServlet extends  HttpServlet{
	 @Override  
	    protected void doGet(HttpServletRequest req, HttpServletResponse resp)  
	            throws ServletException, IOException  
	    {  
	        //直接返回  
		   PrintWriter pw = resp.getWriter();  
		 try{
			 resp.setCharacterEncoding("UTF-8");
			 resp.setContentType("application/json; charset=utf-8");
		   
		      JSONObject data = new JSONObject();
		      
		      JSONArray maps = new JSONArray();
		      JSONObject map = new JSONObject();
		      map.put("name", "China");
		      map.put("value", "1");
		      maps.add(map);
		      map = new JSONObject();
		      map.put("name", "Japan");
		      map.put("value", "-1");
		      maps.add(map);
		      //Russia
		      map = new JSONObject();
		      map.put("name", "Russia");
		      map.put("value", "0");
		      maps.add(map);
		      
		      data.put("mapData", maps);
		      
		      JSONObject pie = new JSONObject();
		      JSONArray pies = new JSONArray();
		    /*  pieData.put("overdue", "1");
		      pieData.put("risk", "0");
		      pieData.put("normal", "0");*/
		      
		      pie.put("name", "overdue");
		      pie.put("value", "1");
		      pies.add(pie);
		      
		      pie = new JSONObject(); 
		      pie.put("name", "risk");
		      pie.put("value", "2");
		      pies.add(pie);
		      
		      pie = new JSONObject(); 
		      pie.put("name", "normal");
		      pie.put("value", "1");
		      pies.add(pie);
		      
		     
		      data.put("pieData", pies);
		      data.put("legendArr", new String[]{"overdue","risk","normal"});
		      pw.write(data.toString());
		      System.out.println(data.toString());
		      pw.flush();
		       
		 }catch(Exception e){
			 e.printStackTrace();
		 }finally{
			 pw.close();
		 }
	    
	          
	       
	    }  
	  
	    @Override  
	    protected void doPost(HttpServletRequest req, HttpServletResponse resp)  
	            throws ServletException, IOException  
	    {  
	       
	        doGet(req, resp);  
	    }  
}
