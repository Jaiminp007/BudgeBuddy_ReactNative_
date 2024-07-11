import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter, useFocusEffect } from "expo-router";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      // Reset state when screen is focused
      setName("");
      setEmail("");
      setMessage("");
      setErrors({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, [])
  );

  const handleSubmit = () => {
    // Reset errors
    setErrors({ name: "", email: "", message: "" });

    // Check for empty fields
    let hasError = false;
    let newErrors = { name: "", email: "", message: "" };

    if (!name) {
      hasError = true;
      newErrors.name = "Name is required.";
    }
    if (!email) {
      hasError = true;
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      hasError = true;
      newErrors.email = "Email is invalid.";
    }
    if (!message) {
      hasError = true;
      newErrors.message = "Message is required.";
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    fetch("https://formspree.io/f/xdknkkla", {
      // Replace with your Formspree form endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
        } else {
          Alert.alert("Error submitting feedback");
        }
      })
      .catch((error) => {
        Alert.alert("Error:", error.message);
      });
  };

  if (submitted) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
              <Ionicons
                name="checkmark-circle-outline"
                size={40}
                color="#4CAF50"
              />
              <Text style={styles.title}>Thank you for your feedback!</Text>
              <Text style={styles.subtitle}>
                Your feedback has been successfully submitted.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Go to Dashboard"
                onPress={() => router.push("/dashboard")}
                color="#007bff"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={40}
                color="#007bff"
              />
              <Text style={styles.title}>We Value Your Feedback!</Text>
              <Text style={styles.subtitle}>
                Help us improve by sharing your thoughts.
              </Text>
            </View>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input, errors.name ? styles.errorInput : null]}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.errorInput : null]}
              value={email}
              onChangeText={setEmail}
              placeholder="Your Email"
              keyboardType="email-address"
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[
                styles.textArea,
                errors.message ? styles.errorInput : null,
              ]}
              value={message}
              onChangeText={setMessage}
              placeholder="Your Feedback"
              multiline
            />
            {errors.message ? (
              <Text style={styles.errorText}>{errors.message}</Text>
            ) : null}
            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleSubmit} color="#007bff" />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default FeedbackForm;
