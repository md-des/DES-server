require('../../actions/models/Hospital');
require('../../actions/models/Admin');
require('../../actions/models/Doctor');
require('../../actions/models/Meta');
require('../../actions/models/SheetType');
require('../../actions/models/CheckList');
require('../../actions/models/SheetReference');
require('../../actions/models/MachineBrand');
require('../../actions/models/Role');
require('../../actions/models/Drug');
const mongoose = require('mongoose');
const basicDB = mongoose.createConnection('mongodb://localhost/DES-basic');
const targetDB = mongoose.createConnection('mongodb://localhost/DES-cloud');

function createHospital(name) {
  return new Promise((resolve, reject) => {
    const Hospital = targetDB.model('Hospital');
    const hospital = new Hospital({name});
    hospital.save(error => {
      if (error) {
        reject(error);
      } else {
        resolve(hospital._id);
      }
    });
  });
}

function createAdmin(name, mobile, email, [hospital, doctor]) {
  return new Promise((resolve, reject) => {
    const Admin = targetDB.model('Admin');
    const password = '$2a$08$AhtD/Y541DXp0CT4x/x4sO4JGsj8SLTRLkqlaRKbGfC5Q3AgUPTpu';
    const admin = new Admin({ name, mobile, email, hospital, doctor, password, role: 'superadmin' });
    admin.save(error => {
      if (error) {
        reject(error);
      } else {
        Doctor.findByIdAndUpdate(doctor, { admin: admin._id }).exec(error => {
          if (error) {
            reject(error);
          } else {
            resolve(hospital);
          }
        });
      }
    });
  });
}

function createDoctor(name, mobile, email, hospital) {
  return new Promise((resolve, reject) => {
    const Doctor = targetDB.model('Doctor');
    const doctor = new Doctor({hospital, name, mobile, email, role: 'director', department: '肾内科'});
    doctor.save(error => {
      if (error) {
        reject(error);
      } else {
        resolve([hospital, doctor._id]);
      }
    });
  });
}

function createReferences(obj, target, hospital) {
  if (obj.references) {
    target.references = undefined;
    target.references = [];
    const BasicReference = basicDB.model('SheetReference');
    const TargetReference = targetDB.model('SheetReference');
    const promisis = obj.references.map(reference => new Promise((resolve, reject) => {
      BasicReference.findById(reference).select('-hospital -_id -__v -create_time -synced -update_time').exec((error, doc) => {
        if (error) {
          reject(error);
        } else {
          const args = doc._doc;
          args.hospital = hospital;
          const targetReference = new TargetReference(args);
          targetReference.save(error => {
            if (error) {
              reject(error);
            } else {
              target.references.push(targetReference._id);
              resolve();
            }
          });
        }
      });
    }));
    return Promise.all(promisis);
  } else {
    return Promise.resolve();
  }
}

function createBacisData(hospital) {
  const dataList = ['Meta', 'SheetType', 'CheckList', 'MachineBrand', 'Role', 'Drug'];
  const basicHospital = '5718cfed95fefff811b95cf4';
  const promises = dataList.map(dataType => new Promise((resolve, reject) => {
    const BasicModel = basicDB.model(dataType);
    const TargetModel = targetDB.model(dataType);
    BasicModel.find({hospital: basicHospital}).select('-hospital -_id -__v -create_time -synced -update_time').exec((error, docs) => {
      const docPromises = docs.map(doc => new Promise((resolve, reject) => {
        const args = doc._doc;
        args.hospital = hospital;
        const newDoc = new TargetModel(args);
        createReferences(doc, newDoc, hospital)
          .then(() => {
            newDoc.save(error => {
              if (error) {
                reject(error);
              } else {
                resolve(hospital);
              }
            });
          }, reject);
      }));
      Promise.all(docPromises).then(resolve, reject);
    });
  }));
  return Promise.all(promises);
}

function creator(hospital, doctor, phone, email) {
  return new Promise((resolve, reject) => {
    createHospital(hospital)
      .then(createDoctor.bind(null, doctor, phone, email))
      .then(createAdmin.bind(null, doctor, phone, email))
      .then(createBacisData)
      .then(result =>
        resolve({msg: 'Successed!', hospital: result[0][0]})
      )
      .catch(reject);
  });
}

// creator('南充圣仁康康复医院', '测试医生', null, 'nanchong@omk.io').then(console.log).catch(console.error);
module.exports = creator;
