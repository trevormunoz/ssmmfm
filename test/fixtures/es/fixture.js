/* global define */

define(['mocha'], function() {
    'use strict';

    mocha.setup("bdd");

    beforeEach(function() {
        this.fixtures = {

            AppView: {
              valid: {
                  "took": 282,
                  "timed_out": false,
                  "_shards": {
                    "total": 5,
                    "successful": 5,
                    "failed": 0
                  },
                  "hits": {
                    "total": 1315024,
                    "max_score": 0.9999988,
                    "hits": [
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "6993",
                        "_score": 0.9999988,
                        "fields": {
                          "dish_name_fingerprint": [
                            "mixed pickles"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "671812",
                        "_score": 0.99999857,
                        "fields": {
                          "dish_name_fingerprint": [
                            "94 smorkage"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "1309662",
                        "_score": 0.999996,
                        "fields": {
                          "dish_name_fingerprint": [
                            "mixed tea"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "463488",
                        "_score": 0.9999952,
                        "fields": {
                          "dish_name_fingerprint": [
                            "fruit"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "60750",
                        "_score": 0.99999475,
                        "fields": {
                          "dish_name_fingerprint": [
                            "cocktail oysters"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "1333199",
                        "_score": 0.9999939,
                        "fields": {
                          "dish_name_fingerprint": [
                            "bombay eggs poached"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "243292",
                        "_score": 0.9999936,
                        "fields": {
                          "dish_name_fingerprint": [
                            "and bananas cream sliced"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "154583",
                        "_score": 0.9999926,
                        "fields": {
                          "dish_name_fingerprint": [
                            "beef corned"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "250819",
                        "_score": 0.99999213,
                        "fields": {
                          "dish_name_fingerprint": [
                            "and cream strawberries"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "69637",
                        "_score": 0.99999106,
                        "fields": {
                          "dish_name_fingerprint": [
                            "hamburg lyonnaise potatoes steak"
                          ]
                        }
                      }
                    ]
                  }
                }
              },

              Dishes: {
                      valid: {
                              "took": 2,
                              "timed_out": false,
                              "_shards": {
                                "total": 5,
                                "successful": 5,
                                "failed": 0
                              },
                              "hits": {
                                "total": 98,
                                "max_score": 0,
                                "hits": []
                              },
                              "aggregations": {
                                "dishes": {
                                  "doc_count_error_upper_bound": 0,
                                  "sum_other_doc_count": 0,
                                  "buckets": [
                                    {
                                      "key": 24668,
                                      "doc_count": 83
                                    },
                                    {
                                      "key": 14323,
                                      "doc_count": 4
                                    },
                                    {
                                      "key": 33041,
                                      "doc_count": 2
                                    },
                                    {
                                      "key": 199661,
                                      "doc_count": 2
                                    },
                                    {
                                      "key": 315770,
                                      "doc_count": 2
                                    },
                                    {
                                      "key": 197450,
                                      "doc_count": 1
                                    },
                                    {
                                      "key": 199042,
                                      "doc_count": 1
                                    },
                                    {
                                      "key": 274575,
                                      "doc_count": 1
                                    },
                                    {
                                      "key": 347598,
                                      "doc_count": 1
                                    },
                                    {
                                      "key": 423041,
                                      "doc_count": 1
                                    }
                                  ]
                                }
                              }
                            }
                    },

            ClusterView: {
              valid: {
                  "took": 282,
                  "timed_out": false,
                  "_shards": {
                    "total": 5,
                    "successful": 5,
                    "failed": 0
                  },
                  "hits": {
                    "total": 1315024,
                    "max_score": 0.9999988,
                    "hits": [
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "6993",
                        "_score": 0.9999988,
                        "fields": {
                          "dish_name_fingerprint": [
                            "mixed pickles"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "671812",
                        "_score": 0.99999857,
                        "fields": {
                          "dish_name_fingerprint": [
                            "94 smorkage"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "1309662",
                        "_score": 0.999996,
                        "fields": {
                          "dish_name_fingerprint": [
                            "mixed tea"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "463488",
                        "_score": 0.9999952,
                        "fields": {
                          "dish_name_fingerprint": [
                            "fruit"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "60750",
                        "_score": 0.99999475,
                        "fields": {
                          "dish_name_fingerprint": [
                            "cocktail oysters"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "1333199",
                        "_score": 0.9999939,
                        "fields": {
                          "dish_name_fingerprint": [
                            "bombay eggs poached"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "243292",
                        "_score": 0.9999936,
                        "fields": {
                          "dish_name_fingerprint": [
                            "and bananas cream sliced"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "154583",
                        "_score": 0.9999926,
                        "fields": {
                          "dish_name_fingerprint": [
                            "beef corned"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "250819",
                        "_score": 0.99999213,
                        "fields": {
                          "dish_name_fingerprint": [
                            "and cream strawberries"
                          ]
                        }
                      },
                      {
                        "_index": "menus",
                        "_type": "item",
                        "_id": "69637",
                        "_score": 0.99999106,
                        "fields": {
                          "dish_name_fingerprint": [
                            "hamburg lyonnaise potatoes steak"
                          ]
                        }
                      }
                    ]
                  }
                }
              },

            MenuItem : {
                valid: {
                  "_index": "menus",
                  "_type": "item",
                  "_id": "184236",
                  "_version": 1,
                  "found": true,
                  "_source": {
                    "menu_dish_count": 320,
                    "menu_date": "1901-04-26",
                    "item_updated_at": "20110505T001255+0000",
                    "menu_page_id": 3542,
                    "menu_sponsor": "ROGERS' CHOP HOUSE AND RESTAURANT",
                    "menu_page_count": 4,
                    "item_ypos": 0.39039,
                    "dish_normalized_name": "holland gin",
                    "menu_id": 13622,
                    "dish_times_appeared": 131,
                    "menu_location": "Rogers' Chop House And Restaurant",
                    "dish_menus_appeared": 130,
                    "menu_uri": "http://menus.nypl.org/menus/13622",
                    "menu_page_uri": "http://menus.nypl.org/menu_pages/3542",
                    "page_image_full_height": 4697,
                    "page_image_uuid": "510d47db-6244-a3d9-e040-e00a18064a99",
                    "menu_page_number": 4,
                    "item_created_at": "20110505T001255+0000",
                    "dish_id": 1351,
                    "dish_name": "Holland Gin",
                    "item_uri": "http://menus.nypl.org/menu_items/169975/edit",
                    "item_id": 169975,
                    "image_id": "4000013356",
                    "item_xpos": 0.517143,
                    "dish_name_fingerprint": "gin holland",
                    "page_image_full_width": 3006,
                    "dish_uri": "http://menus.nypl.org/dishes/1351"
                  }
                }
            },

            Cluster: {
              "valid": {
                      "took": 8,
                      "timed_out": false,
                      "_shards": {
                        "total": 5,
                        "successful": 5,
                        "failed": 0
                      },
                      "hits": {
                        "total": 2559,
                        "max_score": 0,
                        "hits": []
                      },
                      "aggregations": {
                        "dish": {
                          "doc_count_error_upper_bound": 0,
                          "sum_other_doc_count": 0,
                          "buckets": [
                            {
                              "key": 4118,
                              "doc_count": 1834,
                              "top_names": {
                                "hits": {
                                  "total": 1834,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "912323",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla ice cream",
                                        "dish_menus_appeared": 1705
                                      },
                                      "sort": [
                                        1705
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 375648,
                              "doc_count": 507,
                              "top_names": {
                                "hits": {
                                  "total": 507,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1251324",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla Ice Cream",
                                        "dish_menus_appeared": 421
                                      },
                                      "sort": [
                                        421
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 16020,
                              "doc_count": 84,
                              "top_names": {
                                "hits": {
                                  "total": 84,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "928382",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice Cream, Vanilla",
                                        "dish_menus_appeared": 77
                                      },
                                      "sort": [
                                        77
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 412003,
                              "doc_count": 19,
                              "top_names": {
                                "hits": {
                                  "total": 19,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1332201",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "vanilla ice cream",
                                        "dish_menus_appeared": 15
                                      },
                                      "sort": [
                                        15
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 35869,
                              "doc_count": 14,
                              "top_names": {
                                "hits": {
                                  "total": 14,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "221039",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla Ice-Cream",
                                        "dish_menus_appeared": 14
                                      },
                                      "sort": [
                                        14
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 12056,
                              "doc_count": 11,
                              "top_names": {
                                "hits": {
                                  "total": 11,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "608737",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice Cream: Vanilla",
                                        "dish_menus_appeared": 11
                                      },
                                      "sort": [
                                        11
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 373798,
                              "doc_count": 11,
                              "top_names": {
                                "hits": {
                                  "total": 11,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "987516",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "VANILLA ICE CREAM",
                                        "dish_menus_appeared": 11
                                      },
                                      "sort": [
                                        11
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 416330,
                              "doc_count": 8,
                              "top_names": {
                                "hits": {
                                  "total": 8,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1343739",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice cream, vanilla",
                                        "dish_menus_appeared": 8
                                      },
                                      "sort": [
                                        8
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 52869,
                              "doc_count": 7,
                              "top_names": {
                                "hits": {
                                  "total": 7,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "179915",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla [ice cream]",
                                        "dish_menus_appeared": 7
                                      },
                                      "sort": [
                                        7
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 286866,
                              "doc_count": 7,
                              "top_names": {
                                "hits": {
                                  "total": 7,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "740887",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla Cream Ice",
                                        "dish_menus_appeared": 7
                                      },
                                      "sort": [
                                        7
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 16556,
                              "doc_count": 6,
                              "top_names": {
                                "hits": {
                                  "total": 6,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "304395",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla Ice Cream.",
                                        "dish_menus_appeared": 6
                                      },
                                      "sort": [
                                        6
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 412058,
                              "doc_count": 6,
                              "top_names": {
                                "hits": {
                                  "total": 6,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1167571",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice cream, Vanilla",
                                        "dish_menus_appeared": 6
                                      },
                                      "sort": [
                                        6
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 80884,
                              "doc_count": 4,
                              "top_names": {
                                "hits": {
                                  "total": 4,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "121132",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla-Ice-Cream",
                                        "dish_menus_appeared": 4
                                      },
                                      "sort": [
                                        4
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 29913,
                              "doc_count": 3,
                              "top_names": {
                                "hits": {
                                  "total": 3,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "124927",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice Cream Vanilla",
                                        "dish_menus_appeared": 3
                                      },
                                      "sort": [
                                        3
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 38295,
                              "doc_count": 3,
                              "top_names": {
                                "hits": {
                                  "total": 3,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "614032",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla (Ice Cream)",
                                        "dish_menus_appeared": 3
                                      },
                                      "sort": [
                                        3
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 53856,
                              "doc_count": 3,
                              "top_names": {
                                "hits": {
                                  "total": 3,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "662113",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice cream - vanilla",
                                        "dish_menus_appeared": 3
                                      },
                                      "sort": [
                                        3
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 239303,
                              "doc_count": 3,
                              "top_names": {
                                "hits": {
                                  "total": 3,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "649351",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla  ice cream",
                                        "dish_menus_appeared": 3
                                      },
                                      "sort": [
                                        3
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 392508,
                              "doc_count": 3,
                              "top_names": {
                                "hits": {
                                  "total": 3,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1077698",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla (ice cream)",
                                        "dish_menus_appeared": 3
                                      },
                                      "sort": [
                                        3
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 26669,
                              "doc_count": 2,
                              "top_names": {
                                "hits": {
                                  "total": 2,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "433861",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla Ice Cream,",
                                        "dish_menus_appeared": 2
                                      },
                                      "sort": [
                                        2
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 386446,
                              "doc_count": 2,
                              "top_names": {
                                "hits": {
                                  "total": 2,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1029928",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice Cream--Vanilla",
                                        "dish_menus_appeared": 2
                                      },
                                      "sort": [
                                        2
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 386460,
                              "doc_count": 2,
                              "top_names": {
                                "hits": {
                                  "total": 2,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1018185",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice Cream - Vanilla",
                                        "dish_menus_appeared": 2
                                      },
                                      "sort": [
                                        2
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 438200,
                              "doc_count": 2,
                              "top_names": {
                                "hits": {
                                  "total": 2,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "987667",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla ice cream ",
                                        "dish_menus_appeared": 2
                                      },
                                      "sort": [
                                        2
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 471896,
                              "doc_count": 2,
                              "top_names": {
                                "hits": {
                                  "total": 2,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1307578",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice Cream, vanilla",
                                        "dish_menus_appeared": 2
                                      },
                                      "sort": [
                                        2
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 47927,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "151973",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice Cream: - vanilla",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 51955,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "174864",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice cream -- vanilla",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 63878,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "123493",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice Cream- Vanilla",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 68512,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "246271",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla, [Ice Cream]",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 75638,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "267962",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla  (Ice Cream)",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 207986,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "600486",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice Cream--Vanilla ",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 231642,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "632241",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice Cream-Vanilla",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 323653,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "418014",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla, ice cream",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 397581,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1056288",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "VANILLA ice cream",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 418515,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1127203",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla, Ice Cream",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 427448,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "346010",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla Ice cream",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 428785,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1155003",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla Ice Cream ",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 442449,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1189138",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla  [ice cream]",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 454776,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1240280",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Ice cream vanilla",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "key": 470360,
                              "doc_count": 1,
                              "top_names": {
                                "hits": {
                                  "total": 1,
                                  "max_score": null,
                                  "hits": [
                                    {
                                      "_index": "menus",
                                      "_type": "item",
                                      "_id": "1293462",
                                      "_score": null,
                                      "_source": {
                                        "dish_name": "Vanilla Ice Cream  ",
                                        "dish_menus_appeared": 1
                                      },
                                      "sort": [
                                        1
                                      ]
                                    }
                                  ]
                                }
                              }
                            }
                          ]
                        }
                      }
                    },


            }
        };
    });
});