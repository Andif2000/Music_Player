import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import react, { useEffect, useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import Songs from "../../Components/Database";

const { width, height } = Dimensions.get("window");

const MusicPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const songSlider = useRef(null);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      setSongIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToProv = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderSongs = ({ index, item }) => {
    return (
      <Animated.View
        style={{
          width: width,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.artWork}>
          <Image source={item.image} style={styles.artImage} />
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Animated.FlatList
          ref={songSlider}
          data={Songs}
          renderItem={renderSongs}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        />

        <View>
          <Text style={styles.title}>{Songs[songIndex].title}</Text>
          <Text style={styles.artis}>{Songs[songIndex].artist}</Text>
        </View>

        <View>
          <Slider
            style={styles.progresContainer}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFF"
            onSlidingComplete={() => {}}
          />
          <View style={styles.labelContainer}>
            <Text style={styles.labelTextContainer}>0:00</Text>
            <Text style={styles.labelTextContainer}>
              {Songs[songIndex].lenght}
            </Text>
          </View>
        </View>
        <View style={styles.musicControls}>
          <TouchableOpacity onPress={skipToProv}>
            <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ios-pause-circle" size={65} color="#FFD369" />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#FFD369"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" size={30} color="#777777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="repeat" size={30} color="#777777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={30} color="#777777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-horizontal" size={30} color="#777777" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    borderTopColor: "#393E46",
    borderTopWidth: 1,
    width: width,
    alignItems: "center",
    paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  artWork: {
    marginTop: 25,
    width: 230,
    height: 260,
    marginBottom: 10,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.85,

    elevation: 5,
  },
  artImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#EEEEEE",
  },
  artis: {
    fontSize: 16,
    fontWeight: "200",
    textAlign: "center",
    color: "#EEEEEE",
  },
  progresContainer: {
    width: 320,
    height: 40,
    marginTop: 10,
    flexDirection: "row",
  },
  labelContainer: {
    width: 320,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelTextContainer: {
    color: "#FFF",
  },
  musicControls: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 50,
  },
});
