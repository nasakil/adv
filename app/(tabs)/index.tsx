import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native";

export default function Home() {
  const { width } = useWindowDimensions(); 
  const isMobile = width < 600; 

  return (
    <View style={[styles.container, { flexDirection: isMobile ? "column" : "row" }]}>
      <Image 
        source={{ uri: "https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-11ej849_779819a7.jpeg?region=0,0,600,600" }} 
        style={[styles.image, { width: isMobile ? 180 : 250, height: isMobile ? 180 : 250 }]} 
      />
      <Text style={[styles.name, { fontSize: isMobile ? 30 : 50 }]}>Norman Asakil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A7B6DD",
    padding: 20,
    gap: 150,
  },
  image: {
    borderRadius: 75, 
  },
  name: {
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
});
