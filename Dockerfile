FROM openjdk:18

# create a directory /app and cd into it
WORKDIR /app
# COPY view view  copies the directory, not the contents inside the directory
COPY Backend/target/rowterbookshop-0.0.1-SNAPSHOT.jar Backend/target/rowterbookshop-0.0.1-SNAPSHOT.jar 

# setup the application and then install npm 
# RUN npm ci

# run the app with this port number
EXPOSE 8080

# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s

ENTRYPOINT ["java", "-jar", "/rowterbookshop-0.0.1-SNAPSHOT.jar"]
