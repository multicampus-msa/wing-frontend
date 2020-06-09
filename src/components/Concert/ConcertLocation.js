import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '60vw',
        height: '50vh',
        marginLeft: 'auto',
        marginRight: 'auto'
    }

}))

//window 객체로부터 스크립트에서 로드한 kakao api를 가져옴
const {kakao} = window;
  
const ConcertLocation = ({place}) => {
    const classes = useStyles();


    useEffect(() => {
        kakao.maps.load(() => {
            let el = document.getElementById('map');
            let map = new kakao.maps.Map(el, {
                center: new kakao.maps.Coords(523951.25, 1085073.75),
                level: 4
            })        

            // var placeName = concert.place;
            var infowindow = new kakao.maps.InfoWindow({zIndex:1});

            //장소 검색 객체를 생성
            const ps = new kakao.maps.services.Places();

            //props로 넘어온 값을 검색
            ps.keywordSearch(place, placesSearchCB);
        
            function placesSearchCB (data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {
            
                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                    // LatLngBounds 객체에 좌표를 추가합니다
                    var bounds = new kakao.maps.LatLngBounds();
            
                    displayMarker(data[0]);    
                    bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
                       
            
                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                    map.setBounds(bounds);
                } 
            }
            // 지도에 마커를 표시하는 함수
            function displayMarker(place) {
    
                // 마커를 생성하고 지도에 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(place.y, place.x) 
                });
            
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
                
            }
        })
        
    }, [place]);
    // 지도 출력
    return (
        <div className="App">
        <div id="map" className={classes.root} />
        </div>
    );
}


export default ConcertLocation;