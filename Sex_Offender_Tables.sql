CREATE TABLE "registry" (
    "Longitude" FLOAT,
    "Latitude" FLOAT,
    "Object_ID" INT,
    "Block_X" INT,
    "Block_Y" INT,
    "Last_Updated" DATE,
    "Sex_Offender_Code" VARCHAR,
    "Date_Added" DATE,
    "Last_Name" VARCHAR,
    "First_Name" VARCHAR,
    "Aliases" VARCHAR,
    "Max_Classification" VARCHAR,
    "DOB" DATE,
    "Height_Inches" INT,
    "Weight_lbs" INT,
    "Eye_Color" VARCHAR,
    "Hair_Color" VARCHAR,
    "Markings" VARCHAR,
    "Date_Registered" DATE,
    "Residence" VARCHAR,
    "District" INT,
    "PSA_Announcement_Number" INT,
    "Block_Address" VARCHAR,
    "Quadrant" VARCHAR,
    "ZIP_Code" VARCHAR,
    CONSTRAINT "pk_registry" PRIMARY KEY (
        "Object_ID"
     )
);

CREATE TABLE "unique_dates" (
    "Longitude" FLOAT,
    "Latitude" FLOAT,
    "Object_ID" INT,
    "Block_X" INT,
    "Block_Y" INT,
    "Last_Updated" DATE,
    "Sex_Offender_Code" VARCHAR,
    "Date_Added" DATE,
    "Last_Name" VARCHAR,
    "First_Name" VARCHAR,
    "Aliases" VARCHAR,
    "Max_Classification" VARCHAR,
    "DOB" DATE,
    "Height_Inches" INT,
    "Weight_lbs" INT,
    "Eye_Color" VARCHAR,
    "Hair_Color" VARCHAR,
    "Markings" VARCHAR,
    "Date_Registered" DATE,
    "Residence" VARCHAR,
    "District" INT,
    "PSA_Announcement_Number" INT,
    "Block_Address" VARCHAR,
    "Quadrant" VARCHAR,
    "ZIP_Code" VARCHAR,
    CONSTRAINT "pk_unique_dates" PRIMARY KEY (
        "Object_ID"
     )
);

SELECT * FROM registry;
SELECT * FROM unique_dates;