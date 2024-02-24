# RUNE

A platform that wants to maximize Onchain games management and create a better user experience for newer players.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- CMake
- A C++ compiler (e.g., GCC, Clang, Visual Studio)

## Cloning the Repository

To clone the project repository, run the following command:

```bash
git clone https://github.com/RuneLabsxyz/RUNE.git
cd RUNE
```

## Set up the build

Create a build folder.

```bash
mkdir build

cd build/
```

### Linux

Create the build

```bash
# architecture (x64, ARM or ARM64):
cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release ..
make -j4
```

Run the build

```bash
 RUNE/Release/RUNE
```
