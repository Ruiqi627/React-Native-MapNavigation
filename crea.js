import React,{Component} from 'react';
import MapView, { Geojson } from 'react-native-maps';
import { StyleSheet,Button,View} from 'react-native';
import axios from 'axios';

const myPlace = { "type": "FeatureCollection",
                  "features": [
                    { "type": "Feature",
                      "geometry": {"type": "Point", "coordinates": [0.0, 0.5]},
                      "properties": {"prop0": "value0"}
                      },
                    { "type": "Feature",
                      "geometry": {
                        "type": "LineString",
                        "coordinates": [
                          [0.0, 0.0], [1.0, 1.0], [1.0, 2.0], [2.0, 3.0]
                          ]
                        },
                      "properties": {
                        "prop0": "value0",
                        "prop1": 0.0
                        }
                      },
                    { "type": "Feature",
                       "geometry": {
                         "type": "Polygon",
                         "coordinates": [
                           [ [0.0, 0.0], [1.0, 0.0], [1.0, 1.0],
                             [0.0, 1.0]]
                           ]

                       },
                       "properties": {
                         "prop0": "value0",
                         "prop1": {"this": "that"}
                         }
                       }
                    ]
                  };


export default class FetchDemo extends Component{
state={
data:{"type":"FeatureCollection",
      "features":[
      {"type":"Feature",
       "id":"waypoints.1",
       "geometry":{
       "type":"Point",
       "coordinates":[8.422148,49.019233]},
       "geometry_name":"geom",
       "properties":{"groupname":"Android Group"}
       },
       {"type":"Feature",
        "id":"waypoints.2",
        "geometry":{
        "type":"Point",
        "coordinates":[8.422148,49.019233]},
        "geometry_name":"geom",
        "properties":{"groupname":"Android Group"}}],
        "totalFeatures":31,
        "numberMatched":31,
        "numberReturned":2,
        "timeStamp":"2022-07-02T12:20:50.770Z",
        "crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}
        }
}

 componentDidMount(){                                   //生命周期函数，页面渲染完成后会主动回调该方法
        this.startFetch();
      }

startFetch(){                                           //自定义的用Fetch进行网络请求的方法
const GEOSERVER = 'http://193.196.36.78:8080/geoserver/MobileGIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=MobileGIS:waypoints&maxFeatures=2&outputFormat=json';

const REQUEST_PARAMS = {
   SERVICE: 'WFS',
         VERSION: '1.1.0',
         REQUEST: 'GetFeature',
         TYPENAME: 'MobileGIS:waypoints',
         MAXFEATURES: 50

};

 axios.get(GEOSERVER, { params: REQUEST_PARAMS })
            .then(( data ) => {
            console.log(data.data,'data')
            this.state.data=data.data
             console.log(this.state.data,'statettt')
            })
            .catch(error => Promise.reject(error));
      }


onPressButton(){
console.log(myPlace,'Myplace')
console.log(this.state.data,'222')
 this.forceUpdate();
}

render(){
return(
 <View style={{flex: 1}}>
  <MapView style={{...StyleSheet.absoluteFillObject}}>
    <Geojson geojson={this.state.data} />
  </MapView>
  <View>
   <Button onPress={this.onPressButton.bind(this)}  title="Get the location information">
   </Button>
</View>
</View>
)
}

}