let myData = {
  bUseMoniData: false,

  //1.1.1
  //无参数
  actList_nonParam: {
    "head": {"respCode": "0", "respDesc": "success"},
    "data": {
      "totalRecord": 31,
      "actList": [{
        "activityId": "0000000007",
        "name": "哈哈哈",
        "startTime": "2017-02-03 12:02:00",
        "endTime": "2017-03-02 12:03:00",
        "actStatus": "2",
        "updateTime": "2018-04-20",
        "delFlag": "1"
      }, {
        "activityId": "0000000008",
        "name": "大家来挖煤",
        "startTime": "2017-02-02 12:02:00",
        "endTime": "2017-03-02 12:03:00",
        "actStatus": "2",
        "updateTime": "2018-04-20",
        "delFlag": "1"
      }, {
        "activityId": "0000000009",
        "name": "大家来挖煤",
        "startTime": "2017-02-02 12:02:00",
        "endTime": "2017-03-02 12:03:00",
        "actStatus": "2",
        "updateTime": "2018-04-20",
        "delFlag": "1"
      }, {
        "activityId": "0000000010",
        "name": "大家来挖煤",
        "startTime": "2017-02-02 12:02:00",
        "endTime": "2017-03-02 12:03:00",
        "actStatus": "2",
        "updateTime": "2018-04-20",
        "delFlag": "1"
      }, {
        "activityId": "0000000011",
        "name": "大家来挖煤",
        "startTime": "2017-02-02 12:02:00",
        "endTime": "2017-03-02 12:03:00",
        "actStatus": "2",
        "updateTime": "2018-04-20",
        "delFlag": "1"
      }, {
        "activityId": "0000000012",
        "name": "大家来挖煤",
        "startTime": "2017-02-02 12:02:00",
        "endTime": "2017-03-02 12:03:00",
        "actStatus": "2",
        "updateTime": "2018-04-20",
        "delFlag": "1"
      }, {
        "activityId": "0000000013",
        "name": "大家来挖煤",
        "startTime": "2017-02-02 12:02:00",
        "endTime": "2017-03-02 12:03:00",
        "actStatus": "2",
        "updateTime": "2018-04-20",
        "delFlag": "1"
      }, {
        "activityId": "0000000014",
        "name": "大家来挖煤",
        "startTime": "2017-02-02 12:02:00",
        "endTime": "2017-03-02 12:03:00",
        "actStatus": "2",
        "updateTime": "2018-04-20",
        "delFlag": "1"
      }, {
        "activityId": "0000000015",
        "name": "大家来挖煤",
        "startTime": "2017-02-02 12:02:00",
        "endTime": "2017-03-02 12:03:00",
        "actStatus": "2",
        "updateTime": "2018-04-20",
        "delFlag": "1"
      }, {
        "activityId": "0000000016",
        "name": "大家来挖煤",
        "startTime": "2017-02-02 12:02:00",
        "endTime": "2017-03-02 12:03:00",
        "actStatus": "2",
        "updateTime": "2018-04-20",
        "delFlag": "1"
      }]
    }
  },
  //带页数
  actList_page: {},

  //1.1.2
  creatAct: {"head": {"respCode": "0", "respDesc": "success"}, "data": {"activityId": "0000000043"}},

  //1.1.3
  actBaseInfo_0000000007: {
    "head": {"respCode": "0", "respDesc": "success"},
    "data": {
      "activityId": "0000000007",
      "startTime": "2017-02-03 00:00:00",
      "endTime": "2017-03-02 00:00:00",
      "name": "哈哈哈",
      "createWay": "1",
      "cityList": []
    }
  },

  //1.1.4
  delectAct: {"head": {"respCode": "0", "respDesc": "success"}, "data": {}},

  //1.1.5
  //无参数:id=2016090104
  actTakelog: {
    "head": {"respCode": "0", "respDesc": "success"},
    "data": {
      "allnop": 5,
      "totalRecord": 5,
      "logList": [
        {
          "msisdn": "18476633666",
          "logTime": "2018-04-18 00:00:00.0",
          "logResult": "2"
        },
        {"msisdn": "18476633667", "logTime": "2018-04-01 00:00:00.0", "logResult": "1"}, {
          "msisdn": "18476633668",
          "logTime": "2018-04-28 00:00:00.0",
          "logResult": "2"
        }, {"msisdn": "18476633656", "logTime": "2018-04-19 00:00:00.0", "logResult": "2"}, {
          "msisdn": "18476633657",
          "logTime": "2018-04-17 00:00:00.0",
          "logResult": "1"
        }]
    }
  },
  //带手机号
  actTakelog_msisdn: {
    "head": {"respCode": "0", "respDesc": "success"},
    "data": {
      "allnop": 5,
      "totalRecord": 1,
      "logList": [{"msisdn": "18476633666", "logTime": "2018-04-18 00:00:00.0", "logResult": "2"}]
    }
  },

  //1.1.6
  //无参数:id=2016090104
  actWinPrize: {
    "head": {"respCode": "0", "respDesc": "success"},
    "data": {
      "resultList": [{
        "msisdn": "18476633334",
        "awardTime": "2018-04-09 00:00:00.0",
        "name": "开心消消乐礼包",
        "type": "1",
        "status": "2",
        "drawTime": "2018-04-11",
        "postAddress": "盘古开天地",
        "postUserName": "女娲",
        "postUserId": "18476666667"
      }, {
        "msisdn": "18476633336",
        "awardTime": "2018-04-19 00:00:00.0",
        "name": "美的电饭锅",
        "type": "",
        "status": "1",
        "drawTime": "2018-04-20"
      }, {
        "msisdn": "18476633335",
        "awardTime": "2018-04-04 00:00:00.0",
        "name": "王者荣耀专享礼包",
        "type": "",
        "status": "2",
        "drawTime": "2018-04-15"
      }, {
        "msisdn": "18476633337",
        "awardTime": "2018-04-28 00:00:00.0",
        "name": "小爱智能音响",
        "type": "",
        "status": "2",
        "drawTime": "2018-04-18"
      }, {
        "msisdn": "18476633333",
        "awardTime": "2018-04-18 00:00:00.0",
        "name": "小米电源",
        "descs": "XDDJ34343DFDS",
        "type": "1",
        "status": "1",
        "drawTime": "2018-04-18",
        "postAddress": "北京天安门",
        "postUserName": "呵呵",
        "postUserId": "18476666666"
      }], "totalRecord": 5, "resultNum": 5, "drawNum": 2
    }
  },

  //1.1.7
  prov: {
    "head": {"respCode": "0", "respDesc": "success"},
    "data": {
      "provList": [
        {"provinceId": "0", "provName": "中央"},
        {
          "provinceId": "1",
          "provName": "北京"
        },
        {"provinceId": "2", "provName": "上海"},
        {"provinceId": "3", "provName": "天津"},
        {
          "provinceId": "4",
          "provName": "重庆"
        },
        {"provinceId": "5", "provName": "黑龙江"},
        {"provinceId": "6", "provName": "吉林"}, {
          "provinceId": "7",
          "provName": "辽宁"
        },
        {"provinceId": "8", "provName": "内蒙古"}, {"provinceId": "9", "provName": "河北"}, {
          "provinceId": "10",
          "provName": "河南"
        }, {"provinceId": "12", "provName": "湖北"}, {"provinceId": "13", "provName": "山东"}, {
          "provinceId": "14",
          "provName": "浙江"
        }, {"provinceId": "15", "provName": "安徽"}, {"provinceId": "16", "provName": "江苏"}, {
          "provinceId": "17",
          "provName": "江西"
        }, {"provinceId": "18", "provName": "云南"}, {"provinceId": "19", "provName": "宁夏"}, {
          "provinceId": "20",
          "provName": "青海"
        }, {"provinceId": "21", "provName": "山西"}, {"provinceId": "22", "provName": "陕西"}, {
          "provinceId": "23",
          "provName": "湖南"
        }, {"provinceId": "24", "provName": "福建"}, {"provinceId": "25", "provName": "甘肃"}, {
          "provinceId": "26",
          "provName": "四川"
        }, {"provinceId": "27", "provName": "广西"}, {"provinceId": "28", "provName": "贵州"}, {
          "provinceId": "29",
          "provName": "海南"
        }, {"provinceId": "30", "provName": "西藏"}, {"provinceId": "31", "provName": "新疆"}, {
          "provinceId": "32",
          "provName": "香港"
        },
        {"provinceId": "33", "provName": "澳门"}, {"provinceId": "34", "provName": "台湾"},
        {
          "provinceId": "11",
          "provName": "广东"
        }
      ]
    }
  },

  //1.1.8
  city_china: {"head": {"respCode": "0", "respDesc": "success"}, "data": {"cityList": []}},
  city_beijing: {
    "head": {"respCode": "0", "respDesc": "success"},
    "data": {
      "cityList": [{"cityId": "414", "cityName": "伊宁市", "provinceId": "1"}, {
        "cityId": "415",
        "cityName": "乌苏市",
        "provinceId": "1"
      }, {"cityId": "419", "cityName": "景洪市", "provinceId": "1"}, {
        "cityId": "427",
        "cityName": "慈溪市",
        "provinceId": "1"
      }, {"cityId": "428", "cityName": "东阳市", "provinceId": "1"}, {
        "cityId": "429",
        "cityName": "富阳市",
        "provinceId": "1"
      }, {"cityId": "430", "cityName": "海宁市", "provinceId": "1"}, {
        "cityId": "434",
        "cityName": "建德市",
        "provinceId": "1"
      }, {"cityId": "435", "cityName": "江山市", "provinceId": "1"}, {
        "cityId": "436",
        "cityName": "椒江市",
        "provinceId": "1"
      }, {"cityId": "438", "cityName": "兰溪市", "provinceId": "1"}, {
        "cityId": "440",
        "cityName": "临海市",
        "provinceId": "1"
      }, {"cityId": "443", "cityName": "瑞安市", "provinceId": "1"}, {
        "cityId": "445",
        "cityName": "嵊州市",
        "provinceId": "1"
      }, {"cityId": "447", "cityName": "桐乡市", "provinceId": "1"}, {
        "cityId": "448",
        "cityName": "温岭市",
        "provinceId": "1"
      }, {"cityId": "450", "cityName": "武义市", "provinceId": "1"}, {
        "cityId": "451",
        "cityName": "萧山市",
        "provinceId": "1"
      }, {"cityId": "452", "cityName": "义乌市", "provinceId": "1"}, {
        "cityId": "453",
        "cityName": "永康市",
        "provinceId": "1"
      }, {"cityId": "454", "cityName": "余杭市", "provinceId": "1"}, {
        "cityId": "455",
        "cityName": "余姚市",
        "provinceId": "1"
      }, {"cityId": "456", "cityName": "乐清市", "provinceId": "1"}, {
        "cityId": "458",
        "cityName": "诸暨市",
        "provinceId": "1"
      }, {"cityId": "461", "cityName": "香港", "provinceId": "1"}, {
        "cityId": "460",
        "cityName": "澳门",
        "provinceId": "1"
      }, {"cityId": "459", "cityName": "台湾", "provinceId": "1"}, {
        "cityId": "9999",
        "cityName": "其他",
        "provinceId": "1"
      }, {"cityId": "1", "cityName": "北京", "provinceId": "1"}, {
        "cityId": "81",
        "cityName": "新会市",
        "provinceId": "1"
      }, {"cityId": "87", "cityName": "岑溪市", "provinceId": "1"}, {
        "cityId": "92",
        "cityName": "凭祥市",
        "provinceId": "1"
      }, {"cityId": "97", "cityName": "赤水市", "provinceId": "1"}, {
        "cityId": "98",
        "cityName": "都匀市",
        "provinceId": "1"
      }, {"cityId": "100", "cityName": "凯里市", "provinceId": "1"}, {
        "cityId": "103",
        "cityName": "海口市",
        "provinceId": "1"
      }, {"cityId": "104", "cityName": "三亚市", "provinceId": "1"}, {
        "cityId": "105",
        "cityName": "文昌市",
        "provinceId": "1"
      }, {"cityId": "106", "cityName": "东方市", "provinceId": "1"}, {
        "cityId": "107",
        "cityName": "安国市",
        "provinceId": "1"
      }, {"cityId": "109", "cityName": "泊头市", "provinceId": "1"}, {
        "cityId": "112",
        "cityName": "定州市",
        "provinceId": "1"
      }, {"cityId": "113", "cityName": "高碑店市", "provinceId": "1"}, {
        "cityId": "115",
        "cityName": "河间市",
        "provinceId": "1"
      }, {"cityId": "118", "cityName": "南宫市", "provinceId": "1"}, {
        "cityId": "124",
        "cityName": "武安市",
        "provinceId": "1"
      }, {"cityId": "125", "cityName": "辛集市", "provinceId": "1"}, {
        "cityId": "128",
        "cityName": "涿州市",
        "provinceId": "1"
      }, {"cityId": "130", "cityName": "登封市", "provinceId": "1"}, {
        "cityId": "132",
        "cityName": "济源市",
        "provinceId": "1"
      }, {"cityId": "136", "cityName": "林州市", "provinceId": "1"}, {
        "cityId": "143",
        "cityName": "卫辉市",
        "provinceId": "1"
      }, {"cityId": "144", "cityName": "舞钢市", "provinceId": "1"}, {
        "cityId": "145",
        "cityName": "舞阳市",
        "provinceId": "1"
      }, {"cityId": "146", "cityName": "新密市", "provinceId": "1"}, {
        "cityId": "150",
        "cityName": "义马市",
        "provinceId": "1"
      }, {"cityId": "154", "cityName": "阿城市", "provinceId": "1"}, {
        "cityId": "155",
        "cityName": "北安市",
        "provinceId": "1"
      }, {"cityId": "158", "cityName": "鹤岗市", "provinceId": "1"}, {
        "cityId": "163",
        "cityName": "七台河市",
        "provinceId": "1"
      }, {"cityId": "165", "cityName": "双鸭山市", "provinceId": "1"}, {
        "cityId": "166",
        "cityName": "绥汾河市",
        "provinceId": "1"
      }, {"cityId": "168", "cityName": "五大连池市", "provinceId": "1"}, {
        "cityId": "170",
        "cityName": "肇东市",
        "provinceId": "1"
      }, {"cityId": "171", "cityName": "绥芬河市", "provinceId": "1"}, {
        "cityId": "172",
        "cityName": "安陆市",
        "provinceId": "1"
      }, {"cityId": "173", "cityName": "丹江口市", "provinceId": "1"}, {
        "cityId": "176",
        "cityName": "汉川市",
        "provinceId": "1"
      }, {"cityId": "177", "cityName": "洪湖市", "provinceId": "1"}, {
        "cityId": "181",
        "cityName": "荆沙市",
        "provinceId": "1"
      }, {"cityId": "120", "cityName": "任丘市", "provinceId": "1"}, {
        "cityId": "121",
        "cityName": "沙河市",
        "provinceId": "1"
      }, {"cityId": "183", "cityName": "老河口市", "provinceId": "1"}, {
        "cityId": "184",
        "cityName": "利川市",
        "provinceId": "1"
      }, {"cityId": "185", "cityName": "蒲圻市", "provinceId": "1"}, {
        "cityId": "186",
        "cityName": "石首市",
        "provinceId": "1"
      }, {"cityId": "189", "cityName": "天门市", "provinceId": "1"}, {
        "cityId": "191",
        "cityName": "武穴市",
        "provinceId": "1"
      }, {"cityId": "192", "cityName": "仙桃市", "provinceId": "1"}, {
        "cityId": "197",
        "cityName": "枝城市",
        "provinceId": "1"
      }, {"cityId": "198", "cityName": "枝江市", "provinceId": "1"}, {
        "cityId": "199",
        "cityName": "襄阳市",
        "provinceId": "1"
      }, {"cityId": "205", "cityName": "洪江市", "provinceId": "1"}, {
        "cityId": "208",
        "cityName": "耒阳市",
        "provinceId": "1"
      }, {"cityId": "209", "cityName": "冷水江市", "provinceId": "1"}, {
        "cityId": "210",
        "cityName": "涟源市",
        "provinceId": "1"
      }, {"cityId": "211", "cityName": "浏阳市", "provinceId": "1"}, {
        "cityId": "213",
        "cityName": "汨罗市",
        "provinceId": "1"
      }, {"cityId": "216", "cityName": "湘乡市", "provinceId": "1"}, {
        "cityId": "226",
        "cityName": "敦化市",
        "provinceId": "1"
      }, {"cityId": "227", "cityName": "扶余市", "provinceId": "1"}, {
        "cityId": "228",
        "cityName": "公主岭市",
        "provinceId": "1"
      }, {"cityId": "229", "cityName": "桦甸市", "provinceId": "1"}, {
        "cityId": "230",
        "cityName": "集安市",
        "provinceId": "1"
      }, {"cityId": "236", "cityName": "延边朝鲜族自治州", "provinceId": "1"}, {
        "cityId": "238",
        "cityName": "洮南市",
        "provinceId": "1"
      }, {"cityId": "239", "cityName": "九台市", "provinceId": "1"}, {
        "cityId": "240",
        "cityName": "常熟市",
        "provinceId": "1"
      }, {"cityId": "242", "cityName": "大丰市", "provinceId": "1"}, {
        "cityId": "243",
        "cityName": "丹阳市",
        "provinceId": "1"
      }, {"cityId": "244", "cityName": "东台市", "provinceId": "1"}, {
        "cityId": "245",
        "cityName": "高邮市",
        "provinceId": "1"
      }, {"cityId": "248", "cityName": "江都市", "provinceId": "1"}, {
        "cityId": "249",
        "cityName": "姜堰市",
        "provinceId": "1"
      }, {"cityId": "250", "cityName": "江阴市", "provinceId": "1"}, {
        "cityId": "251",
        "cityName": "靖江市",
        "provinceId": "1"
      }, {"cityId": "252", "cityName": "昆山市", "provinceId": "1"}, {
        "cityId": "256",
        "cityName": "邳州市",
        "provinceId": "1"
      }, {"cityId": "257", "cityName": "启东市", "provinceId": "1"}, {
        "cityId": "258",
        "cityName": "如皋市",
        "provinceId": "1"
      }, {"cityId": "261", "cityName": "太仓市", "provinceId": "1"}, {
        "cityId": "262",
        "cityName": "泰兴市",
        "provinceId": "1"
      }, {"cityId": "264", "cityName": "吴江市", "provinceId": "1"}, {
        "cityId": "266",
        "cityName": "武进市",
        "provinceId": "1"
      }, {"cityId": "267", "cityName": "锡山市", "provinceId": "1"}, {
        "cityId": "268",
        "cityName": "兴化市",
        "provinceId": "1"
      }, {"cityId": "276", "cityName": "井冈山市", "provinceId": "1"}, {
        "cityId": "278",
        "cityName": "临川市",
        "provinceId": "1"
      }, {"cityId": "279", "cityName": "庐山市", "provinceId": "1"}, {
        "cityId": "284",
        "cityName": "伊春市",
        "provinceId": "1"
      }, {"cityId": "287", "cityName": "北票市", "provinceId": "1"}, {
        "cityId": "294",
        "cityName": "海城市",
        "provinceId": "1"
      }, {"cityId": "296", "cityName": "锦西市", "provinceId": "1"}, {
        "cityId": "302",
        "cityName": "铁法市",
        "provinceId": "1"
      }, {"cityId": "303", "cityName": "瓦房店市", "provinceId": "1"}, {
        "cityId": "304",
        "cityName": "兴城市",
        "provinceId": "1"
      }, {"cityId": "313", "cityName": "满洲里市", "provinceId": "1"}, {
        "cityId": "318",
        "cityName": "牙克石市",
        "provinceId": "1"
      }, {"cityId": "319", "cityName": "呼伦贝尔盟", "provinceId": "1"}, {
        "cityId": "321",
        "cityName": "青铜峡市",
        "provinceId": "1"
      }, {"cityId": "327", "cityName": "安丘市", "provinceId": "1"}, {
        "cityId": "335",
        "cityName": "莱阳市",
        "provinceId": "1"
      }, {"cityId": "336", "cityName": "莱州市", "provinceId": "1"}, {
        "cityId": "338",
        "cityName": "临清市",
        "provinceId": "1"
      }, {"cityId": "340", "cityName": "临淄市", "provinceId": "1"}, {
        "cityId": "341",
        "cityName": "蓬莱市",
        "provinceId": "1"
      }, {"cityId": "343", "cityName": "青州市", "provinceId": "1"}, {
        "cityId": "344",
        "cityName": "曲阜市",
        "provinceId": "1"
      }, {"cityId": "346", "cityName": "荣城市", "provinceId": "1"}, {
        "cityId": "347",
        "cityName": "乳山市",
        "provinceId": "1"
      }, {"cityId": "349", "cityName": "滕州市", "provinceId": "1"}, {
        "cityId": "352",
        "cityName": "文登市",
        "provinceId": "1"
      }, {"cityId": "353", "cityName": "新泰市", "provinceId": "1"}, {
        "cityId": "355",
        "cityName": "兖州",
        "provinceId": "1"
      }, {"cityId": "357", "cityName": "诸城市", "provinceId": "1"}, {
        "cityId": "362",
        "cityName": "华阴市",
        "provinceId": "1"
      }, {"cityId": "363", "cityName": "商州市", "provinceId": "1"}, {
        "cityId": "370",
        "cityName": "韩城市",
        "provinceId": "1"
      }, {"cityId": "373", "cityName": "侯马市", "provinceId": "1"}, {
        "cityId": "380",
        "cityName": "榆次市",
        "provinceId": "1"
      }, {"cityId": "382", "cityName": "河津市", "provinceId": "1"}, {
        "cityId": "385",
        "cityName": "广汉市",
        "provinceId": "1"
      }, {"cityId": "394", "cityName": "邛崃市", "provinceId": "1"}]
    }
  },
  city_shanghai: {
    "head": {"respCode": "0", "respDesc": "success"},
    "data": {"cityList": [{"cityId": "2", "cityName": "上海", "provinceId": "2"}]}
  },
  city_gd: {
    "head": {"respCode": "0", "respDesc": "success"},
    "data": {
      "cityList": [{"cityId": "474", "cityName": "从化市", "provinceId": "11"}, {
        "cityId": "520",
        "cityName": "三水市",
        "provinceId": "11"
      }, {"cityId": "537", "cityName": "云浮市", "provinceId": "11"}, {
        "cityId": "538",
        "cityName": "肇庆市",
        "provinceId": "11"
      }, {"cityId": "541", "cityName": "中山市", "provinceId": "11"}, {
        "cityId": "542",
        "cityName": "珠海市",
        "provinceId": "11"
      }, {"cityId": "53", "cityName": "潮阳市", "provinceId": "11"}, {
        "cityId": "54",
        "cityName": "潮州市",
        "provinceId": "11"
      }, {"cityId": "56", "cityName": "东莞市", "provinceId": "11"}, {
        "cityId": "57",
        "cityName": "佛山市",
        "provinceId": "11"
      }, {"cityId": "58", "cityName": "高明市", "provinceId": "11"}, {
        "cityId": "60",
        "cityName": "广州市",
        "provinceId": "11"
      }, {"cityId": "61", "cityName": "河源市", "provinceId": "11"}, {
        "cityId": "63",
        "cityName": "花都市",
        "provinceId": "11"
      }, {"cityId": "64", "cityName": "惠州市", "provinceId": "11"}, {
        "cityId": "65",
        "cityName": "江门市",
        "provinceId": "11"
      }, {"cityId": "66", "cityName": "揭阳市", "provinceId": "11"}, {
        "cityId": "70",
        "cityName": "茂名市",
        "provinceId": "11"
      }, {"cityId": "71", "cityName": "梅州市", "provinceId": "11"}, {
        "cityId": "72",
        "cityName": "南海市",
        "provinceId": "11"
      }, {"cityId": "73", "cityName": "番禺市", "provinceId": "11"}, {
        "cityId": "74",
        "cityName": "清远市",
        "provinceId": "11"
      }, {"cityId": "75", "cityName": "汕头市", "provinceId": "11"}, {
        "cityId": "76",
        "cityName": "汕尾市",
        "provinceId": "11"
      }, {"cityId": "77", "cityName": "韶关市", "provinceId": "11"}, {
        "cityId": "78",
        "cityName": "深圳市",
        "provinceId": "11"
      }, {"cityId": "79", "cityName": "顺德市", "provinceId": "11"}, {
        "cityId": "82",
        "cityName": "阳江市",
        "provinceId": "11"
      }, {"cityId": "83", "cityName": "增城市", "provinceId": "11"}, {
        "cityId": "84",
        "cityName": "湛江市",
        "provinceId": "11"
      }]
    }
  },

  //1.2.1
  actAdwardList0: {
    "head": {
      "respCode": "0",
      "respDesc": "success"
    },
    "data": {
      "awardList": [
        {
          "typeId": "2",
          "grade": "4",
          "name": "智能电饭煲",
          "type": "1",
          "count": 990,
          "cityAwardList": [
            {
              "provName": "四川",
              "cityName": "成都市",
              "provId": "26",
              "cityId": "383",
              "throwWay": 1,
              "strTotalNum": "2000.00000",
              "strCurNum": "1000.00000",
              "strIncNum": "300.00000",
              "strFreeNum": "1000.00000",
              "strAwardNum": "0.00000",
              "strDrawNum": "0.00000",
              "rate": "0.4",
              "limitCount": "1",
              "acceptPrizeWay": 1
            },
            {
              "provName": "四川",
              "cityName": "德阳市",
              "provId": "26",
              "cityId": "384",
              "throwWay": 1,
              "strTotalNum": "1500.00000",
              "strCurNum": "1000.00000",
              "strIncNum": "500.00000",
              "strFreeNum": "1000.00000",
              "strAwardNum": "0.00000",
              "strDrawNum": "0.00000",
              "rate": "0.2",
              "limitCount": "1",
              "acceptPrizeWay": 1
            },
            {
              "provName": "四川",
              "cityName": "广汉市",
              "provId": "26",
              "cityId": "385",
              "throwWay": 1,
              "strTotalNum": "1500.00000",
              "strCurNum": "500.00000",
              "strIncNum": "20.00000",
              "strFreeNum": "500.00000",
              "strAwardNum": "0.00000",
              "strDrawNum": "0.00000",
              "rate": "0.1",
              "limitCount": "1",
              "acceptPrizeWay": 1
            }
          ],
        }
      ]
    }
  },

  actAdwardList: {
    "head": {"respCode": "0", "respDesc": "success"},
    "data": {
      "awardList": [
        {
        "typeId": "1",
        "grade": "1",
        "name": "魅族耳机4",
        "type": "1",
        "cityAwardList": [
          {
          "provName": "广东",
          "cityName": "广州市",
          "provId": "11",
          "cityId": "60",
          "throwWay": 3,
          "strTotalNum": "500.00000",
          "strCurNum": "0.00000",
          "strIncNum": "23.81000",
          "strFreeNum": "500.00000",
          "strAwardNum": "0.00000",
          "strDrawNum": "0.00000",
          "rate": "0.5",
          "limitCount": "1",
          "acceptPrizeWay": 1
        },
          {
            "provName": "广东",
            "cityName": "佛山市",
            "provId": "11",
            "cityId": "60",
            "throwWay": 3,
            "strTotalNum": "500.00000",
            "strCurNum": "0.00000",
            "strIncNum": "23.81000",
            "strFreeNum": "500.00000",
            "strAwardNum": "0.00000",
            "strDrawNum": "0.00000",
            "rate": "0.5",
            "limitCount": "1",
            "acceptPrizeWay": 1
          }
        ],
        "count": 5997
      },
        {
        "typeId": "2",
        "grade": "1",
        "name": "魅族耳机4",
        "type": "1",
          "cityAwardList": [
            {
              "provName": "广东",
              "cityName": "广州市",
              "provId": "11",
              "cityId": "60",
              "throwWay": 3,
              "strTotalNum": "500.00000",
              "strCurNum": "0.00000",
              "strIncNum": "23.81000",
              "strFreeNum": "500.00000",
              "strAwardNum": "0.00000",
              "strDrawNum": "0.00000",
              "rate": "0.5",
              "limitCount": "1",
              "acceptPrizeWay": 1
            },
            {
              "provName": "广东",
              "cityName": "佛山市",
              "provId": "11",
              "cityId": "60",
              "throwWay": 3,
              "strTotalNum": "500.00000",
              "strCurNum": "0.00000",
              "strIncNum": "23.81000",
              "strFreeNum": "500.00000",
              "strAwardNum": "0.00000",
              "strDrawNum": "0.00000",
              "rate": "0.5",
              "limitCount": "1",
              "acceptPrizeWay": 1
            }

          ],
        "count": -1297
      },
        {
        "typeId": "3",
        "grade": "1",
        "name": "魅族耳机4",
        "type": "1",
          "cityAwardList": [
            {
              "provName": "广东",
              "cityName": "广州市",
              "provId": "11",
              "cityId": "60",
              "throwWay": 3,
              "strTotalNum": "500.00000",
              "strCurNum": "0.00000",
              "strIncNum": "23.81000",
              "strFreeNum": "500.00000",
              "strAwardNum": "0.00000",
              "strDrawNum": "0.00000",
              "rate": "0.5",
              "limitCount": "1",
              "acceptPrizeWay": 1
            },
            {
              "provName": "广东",
              "cityName": "佛山市",
              "provId": "11",
              "cityId": "60",
              "throwWay": 3,
              "strTotalNum": "500.00000",
              "strCurNum": "0.00000",
              "strIncNum": "23.81000",
              "strFreeNum": "500.00000",
              "strAwardNum": "0.00000",
              "strDrawNum": "0.00000",
              "rate": "0.5",
              "limitCount": "1",
              "acceptPrizeWay": 1
            }
          ],
        "count": -930
      }]
    }
  },

  //1.2.2
  delActAdward:{
    "head": {"respCode": "0", "respDesc": "success"},
    "data": {}
  },

  //1.3.1
  getActRuleList:{
    "head":{"respCode":"0","respDesc":"success"},
    "data":
      {"ruleList":[
        {
          "ruleId":1,
          "ruleName":"userCheckRule",
          "descs":"用户资格校验规则",
          "msgType":"award",
          "paraList":[
            {
              "name":"groupId",
              "nameDesc":"用户黑名单ID",
              "paraDesc":"多个黑名单组ID以英文逗号分隔，黑名单组里的用户不能参加活动",
              "type":1,
              "cType":1,
              "paraValue":"",
              "taskParaId":"",
              "taskRuleId":"",
              "taskId":""
            }
            ]
        },
          {
            "ruleId":4,
            "ruleName":"awardLimtChanceRule",
            "descs":"抽奖机会限制规则",
            "msgType":"order",
            "paraList":[
              {
                "name":"acceiveType",
                "nameDesc":"限制范围",
                "paraDesc":"1 按天 2按周 3按月  4按活动期间",
                "type":1,
                "cType":3,
                "paraValue":"",
                "taskParaId":"",
                "taskRuleId":"",
                "taskId":""
              },
              {
                "name":"getSeeds",
                "nameDesc":"获得抽奖机会",
                "paraDesc":"允许用拥有的最大抽奖次数",
                "type":1,
                "cType":1,
                "paraValue":"",
                "taskParaId":"",
                "taskRuleId":"",
                "taskId":""
              },
              {
                "name":"giftSeeds", "nameDesc":"默认抽奖机会", "paraDesc":"允许用拥有的最大抽奖次数", "type":1, "cType":1, "paraValue":"", "taskParaId":"",  "taskRuleId":"", "taskId":""
              },
              {
                "name":"giftType","nameDesc":"限制范围","paraDesc":"1 按天  2按活动期间","type":1,"cType":3,"paraValue":"","taskParaId":"","taskRuleId":"","taskId":""}
              ]
          },

          {
            "ruleId":3,"ruleName":"awardCountRule","descs":"抽奖次数限制规则","msgType":"award","paraList":[{"name":"controlRange","nameDesc":"限制周期","paraDesc":"1 按天  2按周 3按月  4按活动期间","type":1,"cType":3,"paraValue":"","taskParaId":"","taskRuleId":"","taskId":""},{"name":"count","nameDesc":"抽奖次数","paraDesc":"允许用拥有的最大抽奖次数","type":1,"cType":1,"paraValue":"","taskParaId":"","taskRuleId":"","taskId":""}]},{"ruleId":2,"ruleName":"winAwardCountNewRule","descs":"中奖次数限制规则","msgType":"award","paraList":[{"name":"winAwardCount","nameDesc":"中奖次数","paraDesc":"允许用拥有的最大中奖次数","type":1,"cType":1,"paraValue":"","taskParaId":"","taskRuleId":"","taskId":""},{"name":"winAwardType","nameDesc":"限制周期","paraDesc":"1 按天  2按周 3按月  4按活动期间","type":1,"cType":3,"paraValue":"","taskParaId":"","taskRuleId":"","taskId":""}]}]}},
  getActRuleList_created: {
    "head":{"respCode":"0","respDesc":"success"},"data":{"ruleList":[{"ruleId":1,"ruleName":"userCheckRule","descs":"用户资格校验规则","msgType":"award","paraList":[{"name":"groupId","nameDesc":"用户黑名单ID","paraDesc":"多个黑名单组ID以英文逗号分隔，黑名单组里的用户不能参加活动","type":1,"cType":1,"paraValue":"1,2,3","taskParaId":"46","taskRuleId":"13","taskId":"11"}]},{"ruleId":4,"ruleName":"awardLimtChanceRule","descs":"抽奖机会限制规则","msgType":"order","paraList":[{"name":"acceiveType","nameDesc":"限制范围","paraDesc":"1 按天 2按周 3按月  4按活动期间","type":1,"cType":3,"paraValue":"1","taskParaId":"47","taskRuleId":"14","taskId":"12"},{"name":"getSeeds","nameDesc":"获得抽奖机会","paraDesc":"允许用拥有的最大抽奖次数","type":1,"cType":1,"paraValue":"10","taskParaId":"48","taskRuleId":"14","taskId":"12"},{"name":"giftSeeds","nameDesc":"默认抽奖机会","paraDesc":"允许用拥有的最大抽奖次数","type":1,"cType":1,"paraValue":"50","taskParaId":"49","taskRuleId":"14","taskId":"12"},{"name":"giftType","nameDesc":"限制范围","paraDesc":"1 按天  2按活动期间","type":1,"cType":3,"paraValue":"2","taskParaId":"50","taskRuleId":"14","taskId":"12"}]},{"ruleId":3,"ruleName":"awardCountRule","descs":"抽奖次数限制规则","msgType":"award","paraList":[{"name":"controlRange","nameDesc":"限制周期","paraDesc":"1 按天  2按周 3按月  4按活动期间","type":1,"cType":3,"paraValue":"2","taskParaId":"51","taskRuleId":"15","taskId":"11"},{"name":"count","nameDesc":"抽奖次数","paraDesc":"允许用拥有的最大抽奖次数","type":1,"cType":1,"paraValue":"10","taskParaId":"52","taskRuleId":"15","taskId":"11"}]},{"ruleId":2,"ruleName":"winAwardCountNewRule","descs":"中奖次数限制规则","msgType":"award","paraList":[{"name":"winAwardCount","nameDesc":"中奖次数","paraDesc":"允许用拥有的最大中奖次数","type":1,"cType":1,"paraValue":"6","taskParaId":"53","taskRuleId":"16","taskId":"11"},{"name":"winAwardType","nameDesc":"限制周期","paraDesc":"1 按天  2按周 3按月  4按活动期间","type":1,"cType":3,"paraValue":"4","taskParaId":"54","taskRuleId":"16","taskId":"11"}]}]}},


  //1.4.1
  adwardPool0: {
    "head": {"respCode": "0", "respDesc": "成功"},
    "data": {
      "prizeList": [{
        "typeId": "1",
        "totalValue": "5995000.0",
        "prizeType": "1",
        "lupdate": "2018-04-19 07:49:37.0",
        "poolState": "1",
        "delFlag": "1",
        "prizeName": "小米耳机",
        "stock": "5995",
        "totalNum": "11395"
      }, {
        "typeId": "2",
        "totalValue": "203000.0",
        "prizeType": "1",
        "lupdate": "null",
        "poolState": "1",
        "delFlag": "0",
        "prizeName": "耳机",
        "stock": "203",
        "totalNum": "213"
      }, {
        "typeId": "3",
        "totalValue": "70.0",
        "prizeType": "1",
        "lupdate": "null",
        "poolState": "1",
        "delFlag": "0",
        "prizeName": "华为",
        "stock": "70",
        "totalNum": "93"
      }, {
        "typeId": "4",
        "totalValue": "0.0",
        "prizeType": "1",
        "lupdate": "null",
        "poolState": "2",
        "delFlag": "0",
        "prizeName": "太阳能",
        "stock": "0",
        "totalNum": "1"
      }, {
        "typeId": "5",
        "totalValue": "10800.0",
        "prizeType": "2",
        "lupdate": "null",
        "poolState": "1",
        "delFlag": "0",
        "prizeName": "码券柠檬",
        "stock": "900",
        "totalNum": "900"
      }, {
        "typeId": "13",
        "totalValue": "378.0",
        "prizeType": "1",
        "lupdate": "null",
        "poolState": "2",
        "delFlag": "0",
        "prizeName": "柠檬20",
        "stock": "150",
        "totalNum": "150"
      }, {
        "typeId": "14",
        "totalValue": "375.0",
        "prizeType": "1",
        "lupdate": "null",
        "poolState": "1",
        "delFlag": "0",
        "prizeName": "柠檬",
        "stock": "150",
        "totalNum": "150"
      }, {
        "typeId": "15",
        "totalValue": "375.0",
        "prizeType": "1",
        "lupdate": "null",
        "poolState": "1",
        "delFlag": "0",
        "prizeName": "菠萝",
        "stock": "150",
        "totalNum": "150"
      }, {
        "typeId": "16",
        "totalValue": "375.0",
        "prizeType": "1",
        "lupdate": "null",
        "poolState": "1",
        "delFlag": "0",
        "prizeName": "哈密瓜",
        "stock": "150",
        "totalNum": "150"
      }], "totalRecord": 11
    }
  },
  adwardPool:{"head":{"respCode":"0","respDesc":"成功"},
    "data":{
    "prizeList":[
      {"typeId":"18","totalValue":"101550.0","prizeType":"1","lupdate":"null","poolState":"1","delFlag":"0","prizeName":"西瓜2222222","stock":"10155","totalNum":"10155"},
      {"typeId":"13","totalValue":"378.0","prizeType":"1","lupdate":"null","poolState":"2","delFlag":"0","prizeName":"柠檬20","stock":"150","totalNum":"150"},
      {"typeId":"14","totalValue":"375.0","prizeType":"1","lupdate":"null","poolState":"1","delFlag":"0","prizeName":"柠檬","stock":"150","totalNum":"150"},{"typeId":"15","totalValue":"375.0","prizeType":"1","lupdate":"null","poolState":"1","delFlag":"0","prizeName":"菠萝","stock":"150","totalNum":"150"},{"typeId":"16","totalValue":"375.0","prizeType":"1","lupdate":"null","poolState":"1","delFlag":"0","prizeName":"哈密瓜","stock":"150","totalNum":"150"},{"typeId":"27","totalValue":"0.0","prizeType":"2","lupdate":"null","poolState":"2","delFlag":"0","prizeName":"码券菠萝22222","stock":"0","totalNum":"0"},{"typeId":"23","totalValue":"6.0","prizeType":"1","lupdate":"null","poolState":"2","delFlag":"0","prizeName":"1","stock":"3","totalNum":"3"}
      ],"totalRecord":37}},

  //1.2.4
  addActAdward: {"head": {"respCode": "0", "respDesc": "success"}, "data": {}},

  //1.5.1
  getBlackList: {
    "head": {
      "respCode": "0",
      "respDesc": "success"
    },
    "data": {
      groupList: [
        {
          id: 1,
          name: '黑名单组1',
          createDate: '2018-04-14 00:00:00'
        },
        {
          id: 2,
          name: '2',
          createDate: '2018-04-14 00:00:00'
        },
      ],
      totalRecord: 2
    }
  },



};

export default myData
