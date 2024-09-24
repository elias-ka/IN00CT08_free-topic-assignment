import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Button, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useEffect, useState } from "react";

const API_URL = "https://randomfox.ca/floof/";

type RandomFoxResponse = {
  image: string;
  link: string;
};

export default function App() {
  const [response, setResponse] = useState<RandomFoxResponse | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const fetchRandomFox = async () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then(setResponse)
      .catch((err) => console.error("Error fetching random fox:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    (async () => {
      await fetchRandomFox();
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          {response ? (
            <Image
              style={styles.image}
              source={{ uri: response.image }}
              contentFit="cover"
            />
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
        <Button
          title={"Show Another Fox"}
          onPress={fetchRandomFox}
          disabled={loading}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    height: 400,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
