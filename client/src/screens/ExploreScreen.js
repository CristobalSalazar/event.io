import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from '../components/Icon';
import Geolocation from '@react-native-community/geolocation';
import { AuthContext } from '../context/AuthContext';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Explore',
  };

  static contextType = AuthContext;

  state = {
    posts: [],
    position: {
      longitude: -122,
      latitude: 32,
    },
  };

  componentDidMount = async () => {
    Geolocation.getCurrentPosition(
      pos => {
        this.setState({
          position: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        });
      },
      err => console.error(err),
      {
        enableHighAccuracy: true,
      },
    );
  };

  center = () => {
    this.map.animateToRegion(this.state.position, 500);
  };

  render() {
    const { position } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={map => (this.map = map)}
          style={{ height: '100%', width: '100%', flex: 1 }}
          region={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.00522,
            longitudeDelta: 0.00521,
          }}
          showsUserLocation={true}
          showsBuildings={false}
          pitchEnabled={false}
          userLocationAnnotationTitle="Me">
          {this.state.posts.map(post => {
            return (
              <Marker
                key={post.id}
                coordinate={post.pos}
                pinColor="darkseagreen">
                <Callout
                  tooltip={true}
                  onPress={() =>
                    this.props.navigation.navigate('NoteDetails', {
                      post,
                    })
                  }>
                  <Text style={styles.callout}>{post.title}</Text>
                </Callout>
              </Marker>
            );
          })}
          <Icon
            style={styles.icon}
            onPress={() => this.props.navigation.navigate('Note')}
            name="add-circle"
          />
          <Icon
            style={[styles.icon, { bottom: 0 }]}
            onPress={this.center}
            name="locate"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  callout: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  icon: {
    zIndex: 2,
    position: 'absolute',
    left: 12,
    fontSize: 48,
    bottom: 64,
    color: '#0275d8',
  },
});
