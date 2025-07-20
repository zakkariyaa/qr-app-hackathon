import React from "react";
import { ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Text } from "react-native-paper";
import { Styles } from "../styles/Styles";

export default function VolunteerRegisterScreen({ navigation }) {
  const { control, handleSubmit, reset } = useForm();
  const [checkedSkills, setCheckedSkills] = React.useState<string[]>([]);

  const onSubmit = async (data: any) => {
    navigation.navigate("VolunteerSkills", { basicInfo: data });
  };

  return (
    <ScrollView contentContainerStyle={Styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Volunteer Sign-Up
      </Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Full Name"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={Styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            mode="outlined"
            style={Styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="linkedin"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="LinkedIn Profile URL"
            value={value}
            onChangeText={onChange}
            keyboardType="url"
            mode="outlined"
            style={Styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="location"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Location"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={Styles.input}
          />
        )}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 24 }}
      >
        Next
      </Button>
    </ScrollView>
  );
}
