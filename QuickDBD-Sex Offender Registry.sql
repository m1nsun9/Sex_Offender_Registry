CREATE TABLE "registry" (
    "Longitude" DEC   NOT NULL,
    "Latitude" DEC   NOT NULL,
    "Object_ID" INT   NOT NULL,
    "Block_X" INT   NOT NULL,
    "Block_Y" INT   NOT NULL,
    "Last_Updated" DATE   NOT NULL,
    "Sex_Offender_Code" VARCHAR   NOT NULL,
    "Date_Added" DATE   NOT NULL,
    "Last_Name" VARCHAR   NOT NULL,
    "First_Name" VARCHAR   NOT NULL,
    "Aliases" VARCHAR   NOT NULL,
    "Max_Classification" VARCHAR   NOT NULL,
    "DOB" DATE   NOT NULL,
    "Height_Inches" INT   NOT NULL,
    "Weight_lbs" INT   NOT NULL,
    "Eye_Color" VARCHAR   NOT NULL,
    "Hair_Color" VARCHAR   NOT NULL,
    "Markings" VARCHAR   NOT NULL,
    "Date_Registered" DATE   NOT NULL,
    "Residence" VARCHAR   NOT NULL,
    "District" DEC   NOT NULL,
    "PSA_Announcement_Number" DEC   NOT NULL,
    "Block_Address" VARCHAR   NOT NULL,
    "Quadrant" VARCHAR   NOT NULL,
    "ZIP_Code" CHAR   NOT NULL,
    CONSTRAINT "pk_registry" PRIMARY KEY (
        "Sex_Offender_Code"
     )
);

CREATE TABLE "unique_dates" (
    "Longitude" DEC   NOT NULL,
    "Latitude" DEC   NOT NULL,
    "Object_ID" INT   NOT NULL,
    "Block_X" INT   NOT NULL,
    "Block_Y" INT   NOT NULL,
    "Last_Updated" DATE   NOT NULL,
    "Sex_Offender_Code" VARCHAR   NOT NULL,
    "Date_Added" DATE   NOT NULL,
    "Last_Name" VARCHAR   NOT NULL,
    "First_Name" VARCHAR   NOT NULL,
    "Aliases" VARCHAR   NOT NULL,
    "Max_Classification" VARCHAR   NOT NULL,
    "DOB" DATE   NOT NULL,
    "Height_Inches" INT   NOT NULL,
    "Weight_lbs" INT   NOT NULL,
    "Eye_Color" VARCHAR   NOT NULL,
    "Hair_Color" VARCHAR   NOT NULL,
    "Markings" VARCHAR   NOT NULL,
    "Date_Registered" DATE   NOT NULL,
    "Residence" VARCHAR   NOT NULL,
    "District" DEC   NOT NULL,
    "PSA_Announcement_Number" DEC   NOT NULL,
    "Block_Address" VARCHAR   NOT NULL,
    "Quadrant" VARCHAR   NOT NULL,
    "ZIP_Code" CHAR   NOT NULL,
    CONSTRAINT "pk_unique_dates" PRIMARY KEY (
        "Sex_Offender_Code"
     )
);

