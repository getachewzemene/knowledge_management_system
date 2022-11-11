const csv = require("csvtojson");
const request = require("request");
const db = require("../models");
const generateId = require("../utils/generate_id");
const encryptDecryptPassword = require("../utils/enc_dec_password");
const addUser = async (req, res) => {
  const id = generateId();
  // console.log(req.body);
  // console.log("id:" + id);
  // console.log("hashePassword:" + encryptPassword(req.body.password));
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    DOB,
    employeeNatureId,
    pensionNumber,
    retirementDate,
    isTerminated,
    salary,
    department,
    address,
    role,
  } = req.body;

  const hashPassword = encryptDecryptPassword.encryptPassword(password);
  try {
    const isUserFound = await db.User.findOne({
      where: { email: email },
    });
    if (!isUserFound) {
      const userModel = await db.User.create({
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        phone: phone,
        gender: gender,
        DOB: DOB,
        employeeNatureId: employeeNatureId,
        pensionNumber: pensionNumber,
        retirementDate: retirementDate,
        isTerminated: isTerminated,
        salary: salary,
        department: department,
        address: address,
        role: role,
      });
      req.flash("message", "user data added successfully");
      res.redirect(302, "/admin");
    } else {
      req.flash("message", "user already found try again");
      res.redirect(302, "/admin");
    }
  } catch (error) {
    console.log(error);
    req.flash("message", "internal error occured try again");
    res.redirect(302, "/admin");
  }
};
const updateUser = async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    DOB,
    employeeNatureId,
    pensionNumber,
    retirementDate,
    isTerminated,
    salary,
    department,
    address,
    role,
  } = req.body;
  // console.log(req.body);
  try {
    const isUserFound = await db.User.findOne({
      where: { id: id },
    });
    if (isUserFound) {
      const hashPassword = encryptDecryptPassword.encryptPassword(password);
      const updateUser = await db.User.update(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashPassword,
          phone: phone,
          gender: gender,
          DOB: DOB,
          employeeNatureId: employeeNatureId,
          pensionNumber: pensionNumber,
          retirementDate: retirementDate,
          isTerminated: isTerminated,
          salary: salary,
          department: department,
          address: address,
          role: role,
        },
        {
          where: { id: id },
          returning: true,
        }
      );
      // console.log(updateUser);
      req.flash("message", "user data updated successfully!");
      res.redirect(302, "/admin");
    } else {
      req.flash("message", "user not found try again!");
      res.redirect(302, "/admin");
    }
  } catch (err) {
    console.log(err);
    req.flash("message", "internal error occured try again!");
    res.redirect(302, "/admin");
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const deleteUser = await db.User.destroy({
      where: { id: id },
      returning: true,
    });
    req.flash("message", "user deleted successfully!");
    res.redirect(302, "/admin");
  } catch (err) {
    req.flash("message", "internal error occured try again");
    res.redirect(302, "/admin");
  }
};
const getAllUser = async (req, res) => {
  try {
    const allUser = await db.User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "phone",
        "gender",
        "DOB",
        "salary",
        "department",
        "address",
        "role",
        "createdAt",
        "updatedAt",
      ],
    });
    if (!allUser) {
      res.status(404).send("user data not found");
    } else {
      res.status(200).send(allUser);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const addEvent = async (req, res) => {
  const id = generateId();
  const filePath = req.file !== undefined ? req.file.path : null;
  const { title, content, eventDate } = req.body;
  try {
    const isEventFound = await db.Event.findOne({
      where: { title: title },
    });
    if (!isEventFound) {
      const newEvent = await db.Event.create({
        id: id,
        title: title,
        content: content,
        eventDate: eventDate,
        filePath: filePath,
      });
      req.flash("message", "event added successfully");
      res.redirect(302, "/admin");
    } else {
      req.flash("message", "event already found try again!");
      res.redirect(302, "/admin");
    }
  } catch (error) {
    req.flash("message", "internal error occured try again");
    res.redirect(302, "/admin");
  }
};
const addNews = async (req, res) => {
  const id = generateId();
  const { title, content } = req.body;
  try {
    const isNewsFound = await db.News.findOne({
      where: { title: title },
    });
    if (!isNewsFound) {
      const news = await db.News.create({
        id: id,
        title: title,
        content: content,
      });
      req.flash("message", "news added successfully");
      res.redirect(302, "/admin");
    } else {
      req.flash("message", "news already found try again!");
      res.redirect(302, "/admin");
    }
  } catch (error) {
    req.flash("message", "internal error occured try again");
    res.redirect(302, "/admin");
  }
};
const importData = async (req, res) => {
  const { tableName, file } = req.body;
  const userList = [];
  // console.log(tableName);
  // console.log(file);
  const jsonArray = await csv().fromStream(
    request.get(`http://localhost:4000/${file}`)
  );
  // console.log(jsonArray);
  for (var i = 0; i < jsonArray.length; i++) {
    const isUser = await db.User.findOne({
      where: { id: jsonArray[i].id, email: jsonArray[i].email },
    });
    if (!isUser) {
      userList.push(jsonArray[i]);
    }
  }
  // console.log("length:" + userList.length);
  if (userList.length === 0) {
    req.flash("message", "data already exist");
    res.redirect(302, "/admin");
  } else {
  for(var i = 0;i<userList.length; i++){
     userList[i].password = encryptDecryptPassword.encryptPassword(
        userList[i].password);
  }
    try {
      const newData = await db.User.bulkCreate(userList);
      if (!newData) {
        req.flash("message", "data not imported");
        res.redirect(302, "/admin");
      } else {
        req.flash("message", "data imported successfully");
        res.redirect(302, "/admin");
      }
    } catch (error) {
      console.log(error);
      req.flash("message", "Something went wrong");
      res.redirect(302, "/admin");
    }
  }
};

module.exports = {
  addUser,
  getAllUser,
  updateUser,
  deleteUser,
  addEvent,
  addNews,
  importData,
};
