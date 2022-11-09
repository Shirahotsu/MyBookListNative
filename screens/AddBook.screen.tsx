import React, { useState } from "react";
import { Button, Text, TextInput, View } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
import FontSize from "../constants/FontSize";
import { TouchableOpacity } from "react-native";
import { Book } from "../models/Book.model";
import { addBook } from "../firebase/bookList.firebase";
import { useToast } from "react-native-toast-notifications";
import { RootTabScreenProps } from "../types";

const AddBookScreen = ({navigation}: RootTabScreenProps<'Search'>) => {
  const toast = useToast();
  const colorScheme = useColorScheme();
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [releaseDate, setReleaseDate] = useState('2022-01-01')
  const [pages, setPages] = useState('0')
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

  const selectCategory = ({label, selected}) =>{
    const newCategories = [...categories].map(category=>{
      if(category.label === label){
        category.selected = !selected
      }
      return category
    })
    setCategories(newCategories)
  }

  const handleOnSubmit = async () =>{
    if(pages.length < 1
      && title.length < 3
      && description.length < 3
      && categories.length < 1
      && !isNaN(parseInt(pages))
    ){
      toast.show('Błędne dane', {type: 'danger'});
      return
    }
    const newBook = {
      title,
      description,
      releaseDate,
      pages: parseInt(pages),
      categories: categories.filter(v=>v.selected).map(v=>v.label)
    }
    const result = await addBook(newBook)
    if(result){
      toast.show('Dodano', {type: 'success'});
      navigation.navigate('Search')
    } else {
      toast.show('Ups! Coś poszło nie tak', {type: 'danger'});
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background, paddingHorizontal: Spacing.md }}>
      <TextInput onChangeText={setTitle} style={{ marginTop: Spacing.md }} placeholder={"Tytuł"} />
      <TextInput onChangeText={setDescription} multiline={true} style={{ minHeight: 30, marginTop: Spacing.md }} placeholder={"Opis"} />
      <TextInput onChangeText={setPages} style={{ minHeight: 30, marginTop: Spacing.md }} placeholder={"Strony"} />
      <TextInput  value={releaseDate} style={{ marginTop: Spacing.md }} placeholder={"Data wydania"} editable={false} />
      <View style={{ marginTop: Spacing.md }}>
        {
          categories.map((category, index) =>
            <TouchableOpacity onPress={()=>selectCategory(category)}>
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
      <Text style={{marginTop:Spacing.lg, marginBottom:Spacing.md, textAlign:'center', fontSize: FontSize.h3, textDecorationStyle: 'solid', textDecorationLine: 'underline', textDecorationColor: Colors[colorScheme].text}}>Dodaj okładkę...</Text>
    </TouchableOpacity>
      <View style={{marginTop: Spacing.xl}}>
        <Button title={'Dodaj książkę'} onPress={()=>{handleOnSubmit()}}/>
      </View>
    </View>
  );
};

export default AddBookScreen;
