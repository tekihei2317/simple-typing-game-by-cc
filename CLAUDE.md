# CLAUDE.md

日本語で返答してください

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page Japanese typing game built with React + TypeScript + Vite. Players type Japanese text using romaji input and view their performance after completion.

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Development Tools**: ESLint + Prettier + TypeScript
- **Romaji Input Handling**: [higgsino](https://github.com/Boson328/higgsino) library

## Development Commands

Since this is a Vite project, typical commands would be:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

_Note: Actual commands should be verified from package.json once project files are implemented_

## Architecture Notes

### Japanese Romaji Input System

- Uses the higgsino library to handle multiple valid romaji inputs for Japanese characters
- Example: "ねこ" can be typed as both "neko" and "neco"
- This library manages the complexity of romaji-to-hiragana conversion and validation

### Game Structure

The typing game follows this flow:

1. Start screen with Space key to begin
2. Sequential word typing with romaji input
3. Progress to next word upon completion
4. Results display after all words are typed

### Word Data

Uses predefined Japanese phrases from MyTyping practice exercises, including both hiragana reading and kanji display text.

## Key Implementation Considerations

- Handle multiple valid romaji input patterns for each Japanese character
- Manage game state transitions (start → typing → results)
- Track typing accuracy and speed metrics
- Responsive design using Tailwind CSS classes
