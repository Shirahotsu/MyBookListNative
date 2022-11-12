import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
import FontSize from "../constants/FontSize";
import { TouchableOpacity } from "react-native";
import { addBook } from "../firebase/bookList.firebase";
import { useToast } from "react-native-toast-notifications";
import { RootTabScreenProps } from "../types";
import Voice, { SpeechErrorEvent, SpeechResultsEvent } from "@react-native-community/voice";
import { faClose, faMicrophone } from "@fortawesome/free-solid-svg-icons";

const AddBookScreen = ({ navigation }: RootTabScreenProps<"Search">) => {

  const onSpeechError = (e: SpeechErrorEvent) => {
    setInputVoice('')
    Voice.destroy().then(Voice.removeAllListeners)
  };

  const onSpeechResults = async (e: SpeechResultsEvent) => {
    if (e?.value) {
      setResultsToInput(e?.value[0]);
      Voice.destroy().then(Voice.removeAllListeners)
    }
  };


  Voice.onSpeechError = onSpeechError;
  Voice.onSpeechResults = onSpeechResults;
  let inputToBeSet = ''

  const toast = useToast();
  const colorScheme = useColorScheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("2022-01-01");
  const [pages, setPages] = useState("");
  const [inputVoice, setInputVoice] = useState("");
  const [categories, setCategories] = useState([
    {
      label: "Fantastyka",
      selected: false,
    },
    {
      label: "SciFi",
      selected: false,
    },
    {
      label: "Przygoda",
      selected: false,
    },
    {
      label: "Komedia",
      selected: false,
    },
    {
      label: "Tajemnica",
      selected: false,
    },
    {
      label: "Bajka",
      selected: false,
    },
    {
      label: "Historia",
      selected: false,
    },
  ]);

  const startRecognizing = async (input: string) => {
    inputToBeSet = input
    setInputVoice(input);
    try {
      await Voice.start("pl-pl");
    } catch (e) {
      toast.show("Ups! Coś poszło nie tak", { type: "danger" });
      await cancelRecognizing();
    }
  };

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const setResultsToInput = (results: string) => {
    if (inputToBeSet === "title") {
      setTitle(results);
    } else if (inputToBeSet === "description") {
      setDescription(results);
    } else if (inputToBeSet === "pages") {
      setPages(results);
    }
    setInputVoice("");
  };

  const selectCategory = ({ label, selected }) => {
    const newCategories = [...categories].map(category => {
      if (category.label === label) {
        category.selected = !selected;
      }
      return category;
    });
    setCategories(newCategories);
  };

  const handleOnSubmit = async () => {
    if (pages.length < 1
      && title.length < 3
      && description.length < 3
      && categories.length < 1
      && !isNaN(parseInt(pages))
    ) {
      toast.show("Błędne dane", { type: "danger" });
      return;
    }
    const newBook = {
      title,
      description,
      releaseDate,
      pages: parseInt(pages),
      categories: categories.filter(v => v.selected).map(v => v.label),
    };
    const result = await addBook(newBook);
    if (result) {
      toast.show("Dodano", { type: "success" });
      navigation.navigate("Search");
    } else {
      toast.show("Ups! Coś poszło nie tak", { type: "danger" });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background, paddingHorizontal: Spacing.md }}>
      <Text>{inputVoice}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: Spacing.md }}>
        <TextInput value={title} onChangeText={setTitle} style={{ flex: 1 }} placeholder={"Tytuł"} />
        <TouchableOpacity onPress={() => startRecognizing("title")}>
          <View style={{
            marginLeft: Spacing.md,
            backgroundColor: Colors.dark.tint,
            height: 40,
            width: 40,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "space-around",
          }}>
            <FontAwesomeIcon color={"white"} icon={inputVoice === "title" ? faClose : faMicrophone} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: Spacing.md }}>
        <TextInput value={description} onChangeText={setDescription} multiline={true} style={{ minHeight: 30, flex: 1 }}
                   placeholder={"Opis"} />
        <TouchableOpacity onPress={() => startRecognizing("description")}>
          <View style={{
            marginLeft: Spacing.md,
            backgroundColor: Colors.dark.tint,
            height: 40,
            width: 40,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "space-around",
          }}>
            <FontAwesomeIcon color={"white"} icon={inputVoice === "description" ? faClose : faMicrophone} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: Spacing.md }}>
        <TextInput value={pages} onChangeText={setPages} style={{ minHeight: 30, flex: 1 }} placeholder={"Strony"} />
        <TouchableOpacity onPress={() => startRecognizing("pages")}>
          <View style={{
            marginLeft: Spacing.md,
            backgroundColor: Colors.dark.tint,
            height: 40,
            width: 40,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "space-around",
          }}>
            <FontAwesomeIcon color={"white"} icon={inputVoice === "pages" ? faClose : faMicrophone} />
          </View>
        </TouchableOpacity>
      </View>
      <TextInput value={releaseDate} style={{ marginTop: Spacing.md }} placeholder={"Data wydania"} editable={false} />
      <View style={{ marginTop: Spacing.md }}>
        {
          categories.map((category, index) =>
            <TouchableOpacity onPress={() => selectCategory(category)}>
              <View key={index} style={{ flexDirection: "row", alignItems: "center", marginTop: Spacing.md }}>
                <FontAwesomeIcon
                  icon={category.selected ? faCheckSquare : faSquare}
                  color={Colors[colorScheme].text}
                  size={FontSize.h2}
                />
                <Text style={{ fontSize: FontSize.h3, marginLeft: Spacing.md }}>{category.label}</Text>
              </View>
            </TouchableOpacity>,
          )
        }
      </View>
      <TouchableOpacity>
        <Text style={{
          marginTop: Spacing.lg,
          marginBottom: Spacing.md,
          textAlign: "center",
          fontSize: FontSize.h3,
          textDecorationStyle: "solid",
          textDecorationLine: "underline",
          textDecorationColor: Colors[colorScheme].text,
        }}>Dodaj okładkę...</Text>
      </TouchableOpacity>
      <View style={{ marginTop: Spacing.xl }}>
        <Button title={"Dodaj książkę"} onPress={() => {
          handleOnSubmit();
        }} />
      </View>
    </View>
  );
};

export default AddBookScreen;
