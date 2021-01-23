import numpy as np

# from flask-cors import CORS
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

rds_connection_string = f"postgres:Eliah27#@localhost:5432/sex_offender_db"
engine = create_engine(f"postgresql://{rds_connection_string}")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

Registry = Base.classes.registry
Unique = Base.classes.unique_dates

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
# CORS(app)


#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/registry", methods=["GET", "POST"])
def registry():
    session = Session(engine)

    results = session.query(Registry.Longitude, Registry.Latitude, Registry.Object_ID,
    Registry.Block_X, Registry.Block_Y, Registry.Last_Updated, Registry.Sex_Offender_Code,
    Registry.Date_Added, Registry.Last_Name, Registry.First_Name, Registry.Aliases,
    Registry.Max_Classification, Registry.DOB, Registry.Height_Inches, Registry.Weight_lbs,
    Registry.Eye_Color, Registry.Hair_Color, Registry.Markings, Registry.Date_Registered,
    Registry.Residence, Registry.District, Registry.PSA_Announcement_Number, Registry.Block_Address,
    Registry.Quadrant, Registry.ZIP_Code).all()

    session.close()

    all_offenders = []
    for data in results:
        offender_dict = {}
        offender_dict["Latitude"] = data.Latitude
        offender_dict["Longitude"] = data.Longitude
        offender_dict["Object_ID"] = data.Object_ID
        offender_dict["Block_X"] = data.Block_X
        offender_dict["Block_Y"] = data.Block_Y
        offender_dict["Last_Updated"] = data.Last_Updated
        offender_dict["Sex_Offender_Code"] = data.Sex_Offender_Code
        offender_dict["Date_Added"] = data.Date_Added
        offender_dict["Last_Name"] = data.Last_Name
        offender_dict["First_Name"] = data.First_Name
        offender_dict["Aliases"] = data.Aliases
        offender_dict["Max_Classification"] = data.Max_Classification
        offender_dict["DOB"] = data.DOB
        offender_dict["Height_Inches"] = data.Height_Inches
        offender_dict["Weight_lbs"] = data.Weight_lbs
        offender_dict["Eye_Color"] = data.Eye_Color
        offender_dict["Hair_Color"] = data.Hair_Color
        offender_dict["Markings"] = data.Markings
        offender_dict["Date_Registered"] = data.Date_Registered
        offender_dict["Residence"] = data.Residence
        offender_dict["District"] = data.District
        offender_dict["PSA_Announcement_Number"] = data.PSA_Announcement_Number
        offender_dict["Block_Address"] = data.Block_Address
        offender_dict["Quadrant"] = data.Quadrant
        offender_dict["ZIP_Code"] = data.ZIP_Code
        all_offenders.append(offender_dict)

    return jsonify(all_offenders)

@app.route("/unique")
def unique():
    session = Session(engine)

    results = session.query(Unique.Longitude, Unique.Latitude, Unique.Object_ID,
    Unique.Block_X, Unique.Block_Y, Unique.Last_Updated, Unique.Sex_Offender_Code,
    Unique.Date_Added, Unique.Last_Name, Unique.First_Name, Unique.Aliases,
    Unique.Max_Classification, Unique.DOB, Unique.Height_Inches, Unique.Weight_lbs,
    Unique.Eye_Color, Unique.Hair_Color, Unique.Markings, Unique.Date_Registered,
    Unique.Residence, Unique.District, Unique.PSA_Announcement_Number, Unique.Block_Address,
    Unique.Quadrant, Unique.ZIP_Code).all()

    session.close()

    all_offenders = []
    for data in results:
        offender_dict = {}
        offender_dict["Latitude"] = data.Latitude
        offender_dict["Longitude"] = data.Longitude
        offender_dict["Object_ID"] = data.Object_ID
        offender_dict["Block_X"] = data.Block_X
        offender_dict["Block_Y"] = data.Block_Y
        offender_dict["Last_Updated"] = data.Last_Updated
        offender_dict["Sex_Offender_Code"] = data.Sex_Offender_Code
        offender_dict["Date_Added"] = data.Date_Added
        offender_dict["Last_Name"] = data.Last_Name
        offender_dict["First_Name"] = data.First_Name
        offender_dict["Aliases"] = data.Aliases
        offender_dict["Max_Classification"] = data.Max_Classification
        offender_dict["DOB"] = data.DOB
        offender_dict["Height_Inches"] = data.Height_Inches
        offender_dict["Weight_lbs"] = data.Weight_lbs
        offender_dict["Eye_Color"] = data.Eye_Color
        offender_dict["Hair_Color"] = data.Hair_Color
        offender_dict["Markings"] = data.Markings
        offender_dict["Date_Registered"] = data.Date_Registered
        offender_dict["Residence"] = data.Residence
        offender_dict["District"] = data.District
        offender_dict["PSA_Announcement_Number"] = data.PSA_Announcement_Number
        offender_dict["Block_Address"] = data.Block_Address
        offender_dict["Quadrant"] = data.Quadrant
        offender_dict["ZIP_Code"] = data.ZIP_Code
        all_offenders.append(offender_dict)

    return jsonify(all_offenders)


if __name__ == '__main__':
    app.run(debug=True)
