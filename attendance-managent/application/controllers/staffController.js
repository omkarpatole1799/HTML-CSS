const staffModel = require("../models/staffModel.js")
const staffController = {
  getStaffLoginPage: (req, res, next) => {
    try {
      res.render("staff/staff-login.ejs")
    } catch (error) {
      console.log(error)
    }
  },

  getStaffDashboard: (req, res, next) => {
    try {
      res.render("staff/staff-dashboard.ejs",{
        
      })
    } catch (error) {
      console.log(error)
    }
  },

  saveStudentData: async (req, res, next) => {
    try {
      let _saveDataResponse = await staffModel.saveStudentData(req.body)
      if (_saveDataResponse[0].affectedRows == 1) {
        return res.status(200).json({
          success: true,
          status: 201,
          message: "Student added succesfully.",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  getStudentsList: async (req, res, next) => {
    try {
      let _studentsListResponse = await staffModel.getStudentsList()
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Students list",
        data: _studentsListResponse[0],
      })
    } catch (error) {
      console.log(error)
    }
  },

  deleteStudent: async (req, res, next) => {
    try {
      let _studentDeleteRes = await staffModel.deleteStudent(req.body.deleteId)
      if (_studentDeleteRes[0].affectedRows == 1) {
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Deleted Student Successfully",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  getSubList: async (req, res, next) => {
    try {
      let _subListRes = await staffModel.getSubList()
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Subjects List",
        data: _subListRes[0],
      })
    } catch (error) {
      console.log(error)
    }
  },
  addSubject: async (req, res, next) => {
    try {
      let data = req.body
      let _addSubResponse = await staffModel.addSubject(data)
      console.log(_addSubResponse, "-response")
      if (_addSubResponse[0].affectedRows === 1) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "Added Subject Successfully",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  deleteSubject: async (req, res, next) => {
    try {
      let _deleteSubRes = await staffModel.deleteSubject(req.body.deleteId)
      console.log(_deleteSubRes)
      if (_deleteSubRes[0].affectedRows === 1) {
        return res.status(201).json({
          success: true,
          status: 200,
          message: "Deleted Subject Successfully",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  // staff authentication
  loginStaff: async (req, res, next) => {
    try {
      let _staffLoginDetails = await staffModel.loginStaff(req.body)

      console.log(_staffLoginDetails)

      if (_staffLoginDetails[0].length == 0) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: "Unauthorized",
        })
      }
      if (_staffLoginDetails[0].length >= 1) {
        req.session.userName = _staffLoginDetails[0][0].username
        req.session.password = _staffLoginDetails[0][0].password

        console.log(req.session, "-session ")
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Authorized",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = staffController
