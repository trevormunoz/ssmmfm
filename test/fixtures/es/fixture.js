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
                valid: {
                      "took": 13,
                      "timed_out": false,
                      "_shards": {
                        "total": 5,
                        "successful": 5,
                        "failed": 0
                      },
                      "hits": {
                        "total": 1307659,
                        "max_score": 1,
                        "hits": [
                          {
                            "_index": "menus",
                            "_type": "item",
                            "_id": "184236",
                            "_score": 1,
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
                          },
                          {
                            "_index": "menus",
                            "_type": "item",
                            "_id": "843693",
                            "_score": 1,
                            "_source": {
                              "menu_dish_count": 53,
                              "menu_date": "1942-11-10",
                              "item_updated_at": "20110919T043616+0000",
                              "menu_page_id": 47986,
                              "menu_sponsor": "San Francisco Overland Limited",
                              "menu_page_count": 2,
                              "item_ypos": 0.485748,
                              "dish_normalized_name": "select roast cornfed beef, served with natural beef juices",
                              "menu_id": 27086,
                              "dish_times_appeared": 1,
                              "menu_location": "San Francisco Overland Limited",
                              "dish_menus_appeared": 1,
                              "menu_uri": "http://menus.nypl.org/menus/27086",
                              "menu_page_uri": "http://menus.nypl.org/menu_pages/47986",
                              "page_image_full_height": 4767,
                              "page_image_uuid": "a7ce120b-651e-0a52-e040-e00a18064537",
                              "menu_page_number": 1,
                              "item_created_at": "20110919T043616+0000",
                              "dish_id": 192311,
                              "dish_name": "SELECT ROAST CORNFED BEEF, Served with Natural Beef Juices",
                              "item_uri": "http://menus.nypl.org/menu_items/568879/edit",
                              "item_id": 568879,
                              "image_id": "3884127",
                              "item_xpos": 0.0985714,
                              "dish_name_fingerprint": "beef cornfed juices natural roast select served with",
                              "page_image_full_width": 6589,
                              "dish_uri": "http://menus.nypl.org/dishes/192311"
                            }
                          },
                          {
                            "_index": "menus",
                            "_type": "item",
                            "_id": "909539",
                            "_score": 1,
                            "_source": {
                              "menu_dish_count": 126,
                              "menu_date": "1955-05-28",
                              "item_updated_at": "20120201T155229+0000",
                              "menu_page_id": 56552,
                              "menu_sponsor": "Paquebot \\Liberté\\\"\"",
                              "menu_page_count": 3,
                              "item_ypos": 0.43248,
                              "dish_normalized_name": "courgettes farcies a la turque",
                              "menu_id": 29482,
                              "dish_times_appeared": 4,
                              "menu_location": "Paquebot \\Liberté\\\"\"",
                              "dish_menus_appeared": 4,
                              "menu_uri": "http://menus.nypl.org/menus/29482",
                              "menu_page_uri": "http://menus.nypl.org/menu_pages/56552",
                              "page_image_full_height": 3840,
                              "page_image_uuid": "b12904ef-a885-84a6-e040-e00a18062103",
                              "menu_page_number": 2,
                              "item_created_at": "20120201T155229+0000",
                              "dish_id": 251712,
                              "dish_name": "Courgettes Farcies a la Turque",
                              "item_uri": "http://menus.nypl.org/menu_items/769856/edit",
                              "item_id": 769856,
                              "image_id": "3968882",
                              "item_xpos": 0.197143,
                              "dish_name_fingerprint": "a courgettes farcies la turque",
                              "page_image_full_width": 5407,
                              "dish_uri": "http://menus.nypl.org/dishes/251712"
                            }
                          },
                          {
                            "_index": "menus",
                            "_type": "item",
                            "_id": "1234003",
                            "_score": 1,
                            "_source": {
                              "menu_dish_count": 360,
                              "menu_date": "1913-05-09",
                              "item_updated_at": "20140917T214524+0000",
                              "menu_page_id": 76336,
                              "menu_sponsor": "Garret Restaurant",
                              "menu_page_count": 4,
                              "item_ypos": 0.295496,
                              "dish_normalized_name": "cold lobster, mayonnaise",
                              "menu_id": 35228,
                              "dish_times_appeared": 5,
                              "menu_location": "Garret Restaurant",
                              "dish_menus_appeared": 5,
                              "menu_uri": "http://menus.nypl.org/menus/35228",
                              "menu_page_uri": "http://menus.nypl.org/menu_pages/76336",
                              "page_image_full_height": 5031,
                              "page_image_uuid": "ff792690-fe38-0131-5170-58d385a7b928",
                              "menu_page_number": 2,
                              "item_created_at": "20140917T171554+0000",
                              "dish_id": 433801,
                              "dish_name": "Cold lobster, mayonnaise",
                              "item_uri": "http://menus.nypl.org/menu_items/1352753/edit",
                              "item_id": 1352753,
                              "image_id": "5149042",
                              "item_xpos": 0.613333,
                              "dish_name_fingerprint": "cold lobster mayonnaise",
                              "page_image_full_width": 3389,
                              "dish_uri": "http://menus.nypl.org/dishes/433801"
                            }
                          },
                          {
                            "_index": "menus",
                            "_type": "item",
                            "_id": "760708",
                            "_score": 1,
                            "_source": {
                              "menu_dish_count": 109,
                              "menu_date": "1974-11-13",
                              "item_updated_at": "20110801T173408+0000",
                              "menu_page_id": 44614,
                              "menu_sponsor": "Simpson's-in-the-Strand",
                              "menu_page_count": 3,
                              "item_ypos": 0.535373,
                              "dish_normalized_name": "lemon syllabub",
                              "menu_id": 26384,
                              "dish_times_appeared": 1,
                              "menu_location": "Simpson's In The Strand",
                              "dish_menus_appeared": 1,
                              "menu_uri": "http://menus.nypl.org/menus/26384",
                              "menu_page_uri": "http://menus.nypl.org/menu_pages/44614",
                              "page_image_full_height": 4818,
                              "page_image_uuid": "a4bc8331-dfac-7423-e040-e00a18065f4e",
                              "menu_page_number": 2,
                              "item_created_at": "20110801T173408+0000",
                              "dish_id": 142952,
                              "dish_name": "Lemon Syllabub",
                              "item_uri": "http://menus.nypl.org/menu_items/491663/edit",
                              "item_id": 491663,
                              "image_id": "2043282",
                              "item_xpos": 0.838571,
                              "dish_name_fingerprint": "lemon syllabub",
                              "page_image_full_width": 6100,
                              "dish_uri": "http://menus.nypl.org/dishes/142952"
                            }
                          },
                          {
                            "_index": "menus",
                            "_type": "item",
                            "_id": "1037673",
                            "_score": 1,
                            "_source": {
                              "menu_dish_count": 174,
                              "menu_date": "1933-05-23",
                              "item_updated_at": "20120504T185027+0000",
                              "menu_page_id": 63408,
                              "menu_sponsor": "The Commodore Hotel",
                              "menu_page_count": 1,
                              "item_ypos": 0.203114,
                              "dish_normalized_name": "cocktail, cherry blossom",
                              "menu_id": 31348,
                              "dish_times_appeared": 7,
                              "menu_location": "The Commodore Hotel",
                              "dish_menus_appeared": 7,
                              "menu_uri": "http://menus.nypl.org/menus/31348",
                              "menu_page_uri": "http://menus.nypl.org/menu_pages/63408",
                              "page_image_full_height": 5847,
                              "page_image_uuid": "bcb737e9-bd41-80f1-e040-e00a180630eb",
                              "menu_page_number": null,
                              "item_created_at": "20120504T185027+0000",
                              "dish_id": 356136,
                              "dish_name": "Cocktail, Cherry Blossom",
                              "item_uri": "http://menus.nypl.org/menu_items/917450/edit",
                              "item_id": 917450,
                              "image_id": "4016393",
                              "item_xpos": 0.324286,
                              "dish_name_fingerprint": "blossom cherry cocktail",
                              "page_image_full_width": 3831,
                              "dish_uri": "http://menus.nypl.org/dishes/356136"
                            }
                          },
                          {
                            "_index": "menus",
                            "_type": "item",
                            "_id": "132278",
                            "_score": 1,
                            "_source": {
                              "menu_dish_count": 33,
                              "menu_date": "1901-10-18",
                              "item_updated_at": "20110424T045802+0000",
                              "menu_page_id": 19066,
                              "menu_sponsor": null,
                              "menu_page_count": 2,
                              "item_ypos": 0.63351,
                              "dish_normalized_name": "string beans",
                              "menu_id": 18832,
                              "dish_times_appeared": 1566,
                              "menu_location": "Southern Railway",
                              "dish_menus_appeared": 1485,
                              "menu_uri": "http://menus.nypl.org/menus/18832",
                              "menu_page_uri": "http://menus.nypl.org/menu_pages/19066",
                              "page_image_full_height": 2339,
                              "page_image_uuid": "510d47db-6f37-a3d9-e040-e00a18064a99",
                              "menu_page_number": 1,
                              "item_created_at": "20110424T045802+0000",
                              "dish_id": 873,
                              "dish_name": "String Beans",
                              "item_uri": "http://menus.nypl.org/menu_items/49592/edit",
                              "item_id": 49592,
                              "image_id": "469987",
                              "item_xpos": 0.43,
                              "dish_name_fingerprint": "beans string",
                              "page_image_full_width": 1723,
                              "dish_uri": "http://menus.nypl.org/dishes/873"
                            }
                          },
                          {
                            "_index": "menus",
                            "_type": "item",
                            "_id": "114062",
                            "_score": 1,
                            "_source": {
                              "menu_dish_count": 129,
                              "menu_date": "1906-12-21",
                              "item_updated_at": "20110629T131800+0000",
                              "menu_page_id": 34718,
                              "menu_sponsor": "FLATIRON RESAURANT AND CAFE",
                              "menu_page_count": 2,
                              "item_ypos": 0.710014,
                              "dish_normalized_name": "coffee cake",
                              "menu_id": 23769,
                              "dish_times_appeared": 135,
                              "menu_location": "Flat Iron Resaurant And Cafe",
                              "dish_menus_appeared": 129,
                              "menu_uri": "http://menus.nypl.org/menus/23769",
                              "menu_page_uri": "http://menus.nypl.org/menu_pages/34718",
                              "page_image_full_height": 5006,
                              "page_image_uuid": "510d47db-833b-a3d9-e040-e00a18064a99",
                              "menu_page_number": 1,
                              "item_created_at": "20110629T131800+0000",
                              "dish_id": 678,
                              "dish_name": "Coffee Cake",
                              "item_uri": "http://menus.nypl.org/menu_items/412597/edit",
                              "item_id": 412597,
                              "image_id": "473864",
                              "item_xpos": 0.525714,
                              "dish_name_fingerprint": "cake coffee",
                              "page_image_full_width": 2934,
                              "dish_uri": "http://menus.nypl.org/dishes/678"
                            }
                          },
                          {
                            "_index": "menus",
                            "_type": "item",
                            "_id": "620313",
                            "_score": 1,
                            "_source": {
                              "menu_dish_count": 83,
                              "menu_date": "1900-03-04",
                              "item_updated_at": "20110511T004642+0000",
                              "menu_page_id": 7733,
                              "menu_sponsor": null,
                              "menu_page_count": 2,
                              "item_ypos": 0.336185,
                              "dish_normalized_name": "champagne george goulet, extra brut",
                              "menu_id": 14984,
                              "dish_times_appeared": 2,
                              "menu_location": "Cunard Line",
                              "dish_menus_appeared": 2,
                              "menu_uri": "http://menus.nypl.org/menus/14984",
                              "menu_page_uri": "http://menus.nypl.org/menu_pages/7733",
                              "page_image_full_height": 1844,
                              "page_image_uuid": "510d47db-4553-a3d9-e040-e00a18064a99",
                              "menu_page_number": 2,
                              "item_created_at": "20110511T004642+0000",
                              "dish_id": 60379,
                              "dish_name": "Champagne George Goulet, Extra Brut",
                              "item_uri": "http://menus.nypl.org/menu_items/215503/edit",
                              "item_id": 215503,
                              "image_id": "4000008530",
                              "item_xpos": 0.175714,
                              "dish_name_fingerprint": "brut champagne extra george goulet",
                              "page_image_full_width": 2764,
                              "dish_uri": "http://menus.nypl.org/dishes/60379"
                            }
                          },
                          {
                            "_index": "menus",
                            "_type": "item",
                            "_id": "338233",
                            "_score": 1,
                            "_source": {
                              "menu_dish_count": 79,
                              "menu_date": "1898-05-19",
                              "item_updated_at": "20110519T190117+0000",
                              "menu_page_id": 25844,
                              "menu_sponsor": "WINDSOR HOTEL",
                              "menu_page_count": 2,
                              "item_ypos": 0.753811,
                              "dish_normalized_name": "figs",
                              "menu_id": 21391,
                              "dish_times_appeared": 499,
                              "menu_location": "Windsor Hotel",
                              "dish_menus_appeared": 483,
                              "menu_uri": "http://menus.nypl.org/menus/21391",
                              "menu_page_uri": "http://menus.nypl.org/menu_pages/25844",
                              "page_image_full_height": 3897,
                              "page_image_uuid": "510d47db-317b-a3d9-e040-e00a18064a99",
                              "menu_page_number": 1,
                              "item_created_at": "20110519T190117+0000",
                              "dish_id": 5408,
                              "dish_name": "Figs",
                              "item_uri": "http://menus.nypl.org/menu_items/254950/edit",
                              "item_id": 254950,
                              "image_id": "467388",
                              "item_xpos": 0.365714,
                              "dish_name_fingerprint": "figs",
                              "page_image_full_width": 1680,
                              "dish_uri": "http://menus.nypl.org/dishes/5408"
                            }
                          }
                        ]
                      }
                    }
                }
        };
    });
});