import React from 'react';
import { StatusBar } from 'expo-status-bar';

export default function GlobalStatusBar() {
  return (
    <StatusBar 
      style="light" 
      backgroundColor="#4a9eff" 
      translucent={false}
      hideTransitionAnimation="fade"
    />
  );
}
