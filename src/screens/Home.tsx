/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import { useItems } from "../api/query";
import { MovieList } from "../api/types";
import { Button, InputText, Label } from "../components";
import { useItemStore } from "../store/server";
import { MovieInputData } from "../utils/sampleData";

const Home: FC = () => {
  const { addItem, deleteItem, items, updateItem } = useItems();
  const selectItem = useItemStore((state) => state.selectItem);
  const [isTextInput, setTextInput] = useState<MovieList>({
    id: "",
    title: "",
    author: "",
    genre: "",
  });
  const [isUpdate, setUpdate] = useState(false);
  const [isLoading, setLoading] = useState(false);

  function handleUpdate(item: any) {
    const { id, genre, author, title } = item;
    setTextInput((prevstate) => ({ ...prevstate, id, genre, author, title }));
    setUpdate(true);
  }
  const handleAddUpdate = () => {
    if (isUpdate) {
      updateItem.mutate(isTextInput);
      setUpdate(false);
    } else {
      const { genre, title, author } = isTextInput;
      if (!genre || !title || !author) {
        alert("Please fill !");
      } else {
        const params = {
          title: isTextInput.title,
          author: isTextInput.author,
          genre: isTextInput.genre,
        };
        addItem.mutate(params);
      }
    }
    setTextInput({ id: "", title: "", author: "", genre: "" });
  };
  const handleDelete = (item: any) => {
    Alert.alert(
      "Hello",
      "Are you sure want to delete this ?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteItem.mutate(item);
          },
        },
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false },
    );
  };
  const handleOnChange = (txt: string, key: string) => {
    setTextInput((prevState) => ({ ...prevState, [key]: txt }));
  };
  const renderHeader = () => (
    <View style={styles.flatListHeader}>
      <Label text="Title" />
      <Label text="Genre" />
      <Label text="Actions" />
    </View>
  );

  return (
    <SafeAreaView>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={20} />
          <Label text="Loading ..." />
        </View>
      ) : (
        <View>
          <View>
            <Label
              text="Movie Max 🍿"
              style={styles.label}
              textStyles={styles.labelText}
            />
          </View>

          <View style={styles.inputContainer}>
            {MovieInputData.map((val, key) => {
              return (
                <View style={styles.textInputContainer} key={key}>
                  <InputText
                    onChange={(txt) => {
                      handleOnChange(txt, val.key);
                    }}
                    value={isTextInput[val.key].toString()}
                    placeholder={val.name}
                  />
                </View>
              );
            })}

            <Button
              onPress={() => {
                handleAddUpdate();
              }}
              text={isUpdate ? "Update" : "Add"}
              buttonStyle={styles.addButton}
            />
          </View>
          <View style={styles.flatlistContainer}>
            <FlatList
              style={{ width: "100%" }}
              data={items}
              keyExtractor={(item, idx) => item?.id + idx.toString()}
              ListEmptyComponent={() => {
                return <Label text="No record!" />;
              }}
              ListHeaderComponent={renderHeader}
              renderItem={({ item }) => {
                return (
                  <View style={styles.flatlistItemContainer}>
                    <Label text={item?.title} style={styles.flatlistItem} />
                    <Label text={item.genre} style={styles.flatlistItem} />
                    <View style={styles.actionButtonContainer}>
                      <Button
                        textStyles={{ fontSize: 15 }}
                        text="✏️"
                        onPress={() => handleUpdate(item)}
                      />
                      <Button
                        textStyles={{ fontSize: 10 }}
                        text="❌"
                        onPress={() => handleDelete(item.id)}
                      />
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionButtonContainer: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  flatlistItem: { width: "30%", textAlign: "center" },
  flatlistItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#b2b6e7",
  },
  flatListHeader: {
    flexDirection: "row",
    backgroundColor: "#1AA7EC",
    justifyContent: "space-evenly",
  },
  flatlistContainer: {
    height: "48%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bbafaf",
  },
  addButton: { backgroundColor: "#1AA7EC", margin: 10 },
  inputContainer: {
    alignItems: "center",
    marginTop: 50,
    justifyContent: "center",
  },
  loadingContainer: {
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  main: { backgroundColor: "red" },
  label: { alignItems: "flex-start" },
  labelText: { fontSize: 30, fontWeight: "800" },
  buttonText: {
    fontSize: 20,
  },
  button: { backgroundColor: "#1AA7EC" },
  textInputContainer: { width: "80%", marginVertical: 5 },
});

export default Home;
