require('../../actions/models/Hospital');
require('../../actions/models/Admin');
require('../../actions/models/Doctor');
require('../../actions/models/Patient');
require('../../actions/models/Medicare');
require('../../actions/models/SheetType');
require('../../actions/models/Sheet');
require('../../actions/models/Diagnosis');
require('../../actions/models/KidneyBasic');
require('../../actions/models/TreatPlan');
require('../../actions/models/DialysisMachine');
require('../../actions/models/DialysisSupply');
require('../../actions/models/Inventory');
const creator = require('./creator');
const mongoose = require('mongoose');
const moment = require('moment');
const targetDB = mongoose.createConnection('mongodb://localhost/DES-cloud');

const config = {
  Patient: {
    count: 50,
    basic(index) {
      return ({
        real_name: `测试患者${index}`,
        person_id: '510112198601099593',
        birthday: '1986-01-08T16:00:00.000Z',
        gender: 'Male',
        type: 'hemodialysis'
      });
    }
  },
  Medicare: {
    count: {
      town: 20,
      country: 20,
      other: 10
    },
    basic(index) {
      if (index < 10) {
        index = `000${index.toString()}`;
      } else if (index < 100) {
        index = `00${index.toString()}`;
      } else if (index < 1000) {
        index = `0${index.toString()}`;
      } else {
        index = index.toString();
      }
      return ({
        locality: '成都市青白江区弥牟镇唐军路',
        number: `13510${index}`
      });
    }
  },
  Sheet: {
    special: {
      count: 10,
      args: [
        '59a938b164097d991124fd0e',
        '59a938b164097d991124fd0f',
        '59a938b164097d991124fd10',
        '59a938b164097d991124fd11',
        '59a938b164097d991124fd12',
        '59a938b164097d991124fd13',
        '59a938b164097d991124fd14',
        '59a938b164097d991124fd15',
        '59a938b164097d991124fd16',
        '59a938b164097d991124fd17'
      ]
    },
    normal: {
      count: 40,
      args: [
        '59b77cb235a5b92170f65985',
        '59b77cb235a5b92170f65986',
        '59b77cb235a5b92170f65987',
        '59b77cb235a5b92170f65988',
        '59b77cb235a5b92170f65989',
        '59b77cb235a5b92170f6598a',
        '59b77cb235a5b92170f6598b',
        '59b77cb235a5b92170f6598c',
        '59b77cb235a5b92170f6598d',
        '59b77cb235a5b92170f6598e'
      ]
    },
    basic: {
      1001: [
        '59a9385864097d991124fcc5',
        '59a9385864097d991124fcc6',
        '59a9385864097d991124fcc7',
        '59a9385864097d991124fcc8',
        '59a9385864097d991124fcc9',
        '59a9385864097d991124fcca',
        '59a9385864097d991124fccb',
        '59a9385864097d991124fccc',
        '59a9385864097d991124fccd',
        '59a9385864097d991124fcce',
        '59a9385864097d991124fccf',
        '59a9385864097d991124fcd0',
        '59a9385864097d991124fcd1',
        '59a9385864097d991124fcd2',
        '59a9385864097d991124fcd3',
        '59a9385864097d991124fcd4',
        '59a9385864097d991124fcd5',
        '59a9385864097d991124fcd6',
        '59a9385864097d991124fcd7'
      ],
      1002: [
        '59a9387064097d991124fcdc',
        '59a9387064097d991124fcdd',
        '59a9387064097d991124fcde',
        '59a9387064097d991124fcdf',
        '59a9387064097d991124fce0',
        '59a9387064097d991124fce1',
        '59a9387064097d991124fce2',
        '59a9387064097d991124fce3',
        '59a9387064097d991124fce4',
        '59a9387064097d991124fce5',
        '59a9387064097d991124fce6',
        '59a9387064097d991124fce7',
        '59a9387064097d991124fce8',
        '59a9387064097d991124fce9',
        '59a9387064097d991124fcea',
        '59a9387064097d991124fceb',
        '59a9387064097d991124fcec',
        '59a9387064097d991124fced',
        '59a9387064097d991124fcee',
        '59a9387064097d991124fcef',
        '59a9387064097d991124fcf0',
        '59a9387064097d991124fcf1',
        '59a9387064097d991124fcf2'
      ],
      1003: [
        '59a9388664097d991124fcf6',
        '59a9388664097d991124fcf7'
      ],
      1004: [
        '59a9389264097d991124fcfb',
        '59a9389264097d991124fcfc',
        '59a9389264097d991124fcfd',
        '59a9389264097d991124fcfe',
        '59a9389264097d991124fcff'
      ],
      1005: [
        '59a938a364097d991124fd03',
        '59a938a364097d991124fd04',
        '59a938a364097d991124fd05',
        '59a938a364097d991124fd06',
        '59a938a364097d991124fd07',
        '59a938a364097d991124fd08',
        '59a938a364097d991124fd09',
        '59a938a364097d991124fd0a'
      ],
      1007: [
        '59a938bd64097d991124fd1a'
      ]
    }
  },
  Diagnosis: {
    diagnosis_time: '2017-06-27T16:00:00.000Z',
    type: '0',
    kidney: {
      stage: '2',
      cgn: false,
      diagnosis: '2',
      other_genetic: '2131',
      pathogenesis: '31',
      inducements: ['32', '36', '41', '51', '72', '92', '101', '100']
    }
  },
  KidneyBasic: {
    dry_weight: 70
  },
  TreatPlan: {
    path_type: 'AVG',
    avg_point: '',
    diagnosis: '慢性肾小球肾炎',
    flag: '0',
    long_terms: [{
      medical_code: '348',
      name: '重组人促红素注射液/(乙)重组人红细胞生成素（重组人促红素）',
      even_week: [{
        day: 2,
        amount: '1000'
      }, {
        day: 4,
        amount: '1000'
      }, {
        day: 6,
        amount: '1000'
      }],
      odd_week: [{
        day: 1,
        'amount': '1000'
      }, {
        day: 5,
        amount: '1000'
      }, {
        day: 3,
        amount: '1000'
      }]
    }],
    drugs: [{
      dosage_form: '注射剂',
      unit: '单位',
      base_dosage: '3000',
      specs: '1盒*10支*3000单位',
      pack: '支',
      drug_type: '西药',
      medical_code: '348',
      vs_name: '重组人促红素注射液',
      name: '重组人促红素注射液/(乙)重组人红细胞生成素（重组人促红素）',
      total: 13,
      limit: 3,
      dosage_amount: '1',
      usage: '1',
      cycle: '7'
    }, {
      name: '克赛',
      vs_name: 'heparin',
      pack: '注射器，2支/盒',
      medical_code: '2215',
      total: 91,
      limit: 15,
      dosage_amount: '1',
      usage: '1',
      cycle: '1'
    }],
    setting: {
      HDHP: {
        frequency: '1_/2',
        lowheparin: '5000',
        conductivity: 140,
        calcium: '1.4',
        blood_volume: '220',
        temperature: '36'
      },
      HDF: {
        frequency: '1_/1',
        lowheparin: '5000',
        conductivity: 140,
        calcium: '1.4',
        blood_volume: '220',
        temperature: '36'
      },
      'HD': {
        blood_volume: '220',
        calcium: '1.4',
        conductivity: 140,
        lowheparin: '',
        frequency: '3_/1',
        heparin: {
          amount: '5000',
          first: '1000',
          preserve: '1000'
        },
        temperature: '36'
      }
    },
    paths: ['左', '前臂', '穿刺点', '顺穿']
  },
  DialysisMachine: {
    count: 20,
    basic: {
      brand: '费森',
      brand_reference: '5996c64b454a02262b07b94f',
      model: '4008B',
      deleted: false,
      preflush: 2,
      disinfect: 2,
      status: 0,
      type: 'HDF',
    },
    A: {
      count: 15,
      status: {
        1: 2,
        2: 1,
        3: 1
      }
    },
    B: {
      count: 5,
      status: {
        1: 1,
        2: 1,
        3: 1
      },
      infectious_disease: {
        '甲肝': 1,
        '乙肝': 1,
        '梅毒': 2,
        HIV: 1
      }
    }
  },
  DialysisSupply: {
    dialyser_type: {
      category: '透析器',
      name: '测试透析器',
      provider: '测试厂家',
      spec: '高通',
      unit: '套',
      note: '测试用透析器',
    },
    needle_artery: {
      category: '穿刺针',
      name: '测试穿刺针',
      provider: '测试厂家',
      spec: '13#',
      unit: '根',
      note: '测试用穿刺针',
    }
  }
};

function findHospital(name) {
  return new Promise((resolve, reject) => {
    const Hospital = targetDB.model('Hospital');
    Hospital.findOne({name})
      .sort({create_time: -1})
      .exec((error, hospitalDoc) => {
        if (error) {
          reject(error);
        } else {
          resolve(hospitalDoc._id);
        }
      });
  });
}

function findOther(hospital) {
  return Promise.all(['Admin', 'Doctor'].map(key =>
    new Promise((resolve, reject) => {
      const Model = targetDB.model(key);
      Model.findOne({hospital})
        .exec((error, doc) => {
          if (error) {
            reject(error);
          } else {
            resolve({hospital, [key.toLocaleLowerCase()]: doc._id});
          }
        });
    })
  ));
}

function createNurse([{hospital, admin}, {doctor}]) {
  return new Promise((resolve, reject) => {
    const Doctor = targetDB.model('Doctor');

    const nurse = new Doctor({hospital, name: '测试护士长', role: 'head-nurse', department: '肾内科'});
    nurse.save(error => {
      if (error) {
        reject(error);
      } else {
        Doctor({hospital, name: '测试护士', role: 'nurse', department: '肾内科'}).save(error => {
          if (error) {
            reject(error);
          } else {
            Doctor({hospital, name: '测试医生', role: 'doctor', department: '肾内科'}).save(error => {
              if (error) {
                reject(error);
              } else {
                resolve([hospital, admin, doctor, nurse._id]);
              }
            });
          }
        });

      }
    });
  });
}

function createPatient([hospital, admin, doctor, nurse]) {
  return new Promise((resolve, reject) => {
    Promise.all(Array(config.Patient.count).fill(null).map((count, index) =>
      new Promise((resolve, reject) => {
        const Patient = targetDB.model('Patient');
        const patient = new Patient({hospital, doctor, nurse, creator: admin, ...(config.Patient.basic(index + 1))});
        patient.save(error => {
          if (error) {
            reject(error);
          } else {
            resolve(patient._id);
          }
        });
      })
    )).then(result =>
        resolve([hospital, doctor, result]),
      reject);
  });
}

function createMedicare([hospital, doctor, patients]) {
  return new Promise((resolve, reject) => {
    const promises = [];
    const Medicare = targetDB.model('Medicare');
    const Patient = targetDB.model('Patient');
    const {Medicare: {count, basic}} = config;
    let left = patients.length;
    Object.keys(count).forEach(key => {
      for (let index = 0; index < count[key]; index += 1, left -= 1) {
        promises.push(new Promise((resolve, reject) => {
          const totalIndex = patients.length - left;
          const medicare = new Medicare({type: key, ...(basic(totalIndex + 1))});
          medicare.save(error => {
            if (error) {
              reject(error);
            } else {
              Patient.findByIdAndUpdate(patients[totalIndex], {medicare: medicare._id})
                .exec(error => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve();
                  }
                });
            }
          });
        }));
      }
    });
    Promise.all(promises)
      .then(() =>
          resolve([hospital, doctor, patients]),
        reject);
  });
}

function createSheet([hospital, doctor, patients]) {
  return new Promise((resolve, reject) => {
    const SheetType = targetDB.model('SheetType');
    const Sheet = targetDB.model('Sheet');
    SheetType.find({hospital, code: {$ne: '1008'}})
      .select('code name')
      .exec((error, docs) => {
        if (error) {
          reject(error);
        } else {
          const {Sheet: {special, normal, basic}} = config;
          Promise.all(docs.map(({_id, code, name}) =>
            Promise.all(patients.map((patient, index) =>
              new Promise((resolve, reject) => {
                const sheet = new Sheet({
                  name,
                  doctor,
                  hospital,
                  code,
                  type: _id,
                  report_time: new Date(),
                  patient: patients[index]
                });
                if (code === '1006') {
                  if (index < special.count) {
                    sheet.results = special.args;
                  } else {
                    sheet.results = normal.args;
                  }
                } else {
                  sheet.results = basic[code];
                }
                sheet.save(error => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve();
                  }
                });
              })
            )).then()
          )).then(() =>
              resolve([hospital, doctor, patients]),
            reject);
        }
      });
  });
}

function createSupply([hospital, doctor, patients]) {
  const DialysisSupply = targetDB.model('DialysisSupply');
  const Inventory = targetDB.model('Inventory');
  return Promise.all(Object.keys(config.DialysisSupply).map(key =>
    new Promise((resolve, reject) => {
      const dialysisSupply = new DialysisSupply(config.DialysisSupply[key]);
      dialysisSupply.hospital = hospital;
      dialysisSupply.save(error => {
        if (error) {
          reject(error);
        } else {
          const inventory = new Inventory({
            supply: dialysisSupply._id,
            hospital,
            doctor,
            batch_number: '溢出数据',
            overflow: true
          });
          inventory.save(error => {
            if (error) {
              reject(error);
            } else {
              resolve({hospital, doctor, patients, [key]: dialysisSupply._id});
            }
          });
        }
      });
    })
  ));
}

function createTreatPlan(results) {
  const args = {};
  results.forEach(result => {
    ['hospital', 'doctor', 'patients', 'dialyser_type', 'needle_artery'].forEach(key => {
      args[key] = args[key] || result[key];
    });
  });
  const TreatPlan = targetDB.model('TreatPlan');
  const {hospital, doctor, patients, dialyser_type, needle_artery} = args;
  return new Promise((resolve, reject) =>
    Promise.all(patients.map(patient =>
      new Promise((resolve, reject) => {
        const treatPlan = new TreatPlan(config.TreatPlan);
        treatPlan.patient = patient;
        treatPlan.start_time = moment().startOf('days');
        treatPlan.end_time = moment().add(3, 'months');
        treatPlan.doctor = doctor;
        ['HD', 'HDF', 'HDHP'].forEach(type => {
          treatPlan.setting[type].dialyzer = {name: '测试透析器', origin_item: dialyser_type};
          treatPlan.setting[type].needle_artery = {name: '测试穿刺针', origin_item: needle_artery};
          treatPlan.setting[type].needle_vein = {name: '测试穿刺针', origin_item: needle_artery};
        });
        treatPlan.save(error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      })
    )).then(() =>
        resolve([hospital, doctor, patients]),
      reject)
  );
}

function createOther([hospital, doctor, patients]) {
  return new Promise((resolve, reject) => {
    Promise.all(['Diagnosis', 'KidneyBasic'].map(key =>
      Promise.all(patients.map(patient =>
        new Promise((resolve, reject) => {
          const Model = targetDB.model(key);
          const model = new Model({patient, doctor, ...config[key]});
          model.save(error => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        })
      )).then()
    )).then(() =>
        resolve(hospital),
      reject);
  });
}

function createMachine(hospital) {
  return new Promise((resolve, reject) => {
    const promisis = [];
    const DialysisMachine = targetDB.model('DialysisMachine');
    const {DialysisMachine: {count, basic, A, B}} = config;
    const aCopy = {};
    const bCopy = {};
    Object.assign(aCopy, A);
    Object.assign(bCopy, B);
    for (let index = 0; index < count; index += 1) {
      promisis.push(new Promise((resolve, reject) => {
        const dialysisMachine = new DialysisMachine({hospital, index: index + 1, bed_index: index + 1, ...basic});
        if (aCopy.count > 0) {
          dialysisMachine.area = 'A';
          Object.keys(aCopy.status).forEach(status => {
            if (dialysisMachine.status === 0 && aCopy.status[status] > 0) {
              dialysisMachine.status = status;
              aCopy.status[status] -= 1;
            }
          });
          aCopy.count -= 1;
        } else if (bCopy.count > 0) {
          dialysisMachine.area = 'B';
          Object.keys(bCopy.status).forEach(key => {
            if (dialysisMachine.status === 0 && bCopy.status[key] > 0) {
              dialysisMachine.status = key;
              bCopy.status[key] -= 1;
            }
          });
          Object.keys(bCopy.infectious_disease).forEach(key => {
            if (!dialysisMachine.infectious_disease && bCopy.infectious_disease[key] > 0) {
              dialysisMachine.infectious_disease = key;
              bCopy.infectious_disease[key] -= 1;
            }
          });
          bCopy.count -= 1;
        }
        dialysisMachine.save(error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }));
    }
    Promise.all(promisis)
      .then(() =>
          resolve(hospital),
        reject
      );
  });
}

function demo(hospital, doctor, phone, email) {
  return new Promise((resolve, reject) => {
    creator(hospital, doctor, phone, email)
      .then(findHospital.bind(null, hospital))
      .then(findOther)
      .then(createNurse)
      .then(createPatient)
      .then(createMedicare)
      .then(createSheet)
      .then(createSupply)
      .then(createTreatPlan)
      .then(createOther)
      .then(createMachine)
      .then(() => resolve('Successed!'))
      .catch(reject);
  });
}

module.exports = demo;
