package com.bitbalancers.hackathon.util;


public class UtilFunctions {
    public static double distance(double latitude1,
                                  double latitude2, double longitude1,
                                  double longitude2)
    {

        longitude1 = Math.toRadians(longitude1);
        longitude2 = Math.toRadians(longitude2);
        latitude1 = Math.toRadians(latitude1);
        latitude2 = Math.toRadians(latitude2);

        double dlon = longitude2 - longitude1;
        double dlat = latitude2 - latitude1;
        double a = Math.pow(Math.sin(dlat / 2), 2)
                + Math.cos(latitude1) * Math.cos(latitude2)
                * Math.pow(Math.sin(dlon / 2),2);

        double c = 2 * Math.asin(Math.sqrt(a));

        double r = 6371;

        return(c * r);
    }
}
