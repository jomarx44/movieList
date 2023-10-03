import "react-native-url-polyfill/auto";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FC, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { RootTabParamList } from "./src/navigations/root";
import Home from "./src/screens/Home";
import ScreenA from "./src/screens/Tab";
import ScreenB from "./src/screens/Tab2";

const Tabs = createBottomTabNavigator<RootTabParamList>();
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tabs.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarLabelStyle: {
              position: "absolute",
              fontSize: 20,
            },
            headerShown: false,
            tabBarIconStyle: { display: "none" },
            tabBarActiveTintColor: "#000",
            tabBarActiveBackgroundColor: "#ffc245",
            tabBarStyle: {
              height: 80,
              width: "auto",
              backgroundColor: "#ffc245",
            },
            tabBarItemStyle: {
              width: 70,
              paddingHorizontal: 0,
              position: "relative",
              padding: 0,
              height: 45,
            },
            tabBarInactiveTintColor: "#000",
            tabBarInactiveBackgroundColor: "#fff",
          }}
        >
          <Tabs.Screen name="Home" component={Home} />
          <Tabs.Screen name="ScreenA" component={ScreenA} />
          <Tabs.Screen name="ScreenB" component={ScreenB} />
        </Tabs.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
