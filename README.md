# Create mysql database 

           create database test_db
           use test_db;
       
# Create table 

           CREATE TABLE `registration` (
             `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
             `username` varchar(255) NOT NULL,
             `login_mode` varchar(255) NOT NULL DEFAULT '',
             `email` varchar(255) NOT NULL,
             `password` varchar(255) NOT NULL,
             `access_token` text NOT NULL,
             `Mobile_number` varchar(255) DEFAULT NULL,
             `gender` varchar(255) DEFAULT NULL,
             `age` varchar(255) DEFAULT NULL,
             `city` varchar(255) DEFAULT NULL,
             `country` varchar(255) DEFAULT NULL,
             `profile_image` varchar(255) DEFAULT 'null',
             `created_datetime` datetime NOT NULL,
             `last_login` datetime NOT NULL,
             `otp` int(11) DEFAULT '0',
             `otp_msg` varchar(100) DEFAULT NULL,
             PRIMARY KEY (`email`),
             KEY `id` (`id`)
           ) ;

# config db connection 
           go to middleware folder and open dbCon file and pass username host password and database name

# Donwload and run following command on root directory 

    yarn install or npm install 


# Run 
    node app.js or  nodemon app.js

# Node-Backend
    Nodejs Login and registration API


# Images
     user profile image upload on this folder
# Midilleware
    auth.js => authontication by using json webtoken on 
    dbCon => mysql database connection 
# Router 
    user.js => router where user login and registration query written
    
    
# user registration pass param
   {
        "email":" ",
        "password":" ",
        "username":" ",
        "mob_no":" ",
        "gender":" ",
        "city":" ",
        "country":" ",
        "age":" ",
        "user_image":""
    }
    
# user login pass param 
   {
    "email":" ",
    "password":" "
    }
      
# auth
   after login user get json web token if email and password is correct
   
   for user details pass json web token 
   "headers":{	"authorization":"auth token"}
        
        
        
For frontend react redux UI download https://github.com/akash22396/reactLogin  project
   

     
    
 
     
