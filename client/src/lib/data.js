// Helper function to generate random pins for demo purposes
export function generatePins(count) {
  const pins = [];

  for (let i = 0; i < count; i++) {
    // Generate random dimensions between certain ranges
    const width = Math.floor(Math.random() * 300) + 200;
    const height = Math.floor(Math.random() * 400) + 200;

    // Generate a random color
    const colors = [
      "#ffcdd2",
      "#f8bbd0",
      "#e1bee7",
      "#d1c4e9",
      "#c5cae9",
      "#bbdefb",
      "#b3e5fc",
      "#b2ebf2",
      "#b2dfdb",
      "#c8e6c9",
      "#dcedc8",
      "#f0f4c3",
      "#fff9c4",
      "#ffecb3",
      "#ffe0b2",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Generate random user
    const userNames = [
      "Alex",
      "Jamie",
      "Taylor",
      "Jordan",
      "Casey",
      "Riley",
      "Morgan",
      "Avery",
    ];
    const userName = userNames[Math.floor(Math.random() * userNames.length)];

    // Generate random titles
    const titles = [
      "Modern Interior Design",
      "Mountain Landscape",
      "Healthy Breakfast Ideas",
      "DIY Home Projects",
      "Travel Photography",
      "Fashion Inspiration",
      "Minimalist Workspace",
      "Cozy Reading Corner",
      "Summer Outfit Ideas",
      "Architectural Photography",
    ];
    const title = titles[Math.floor(Math.random() * titles.length)];

    pins.push({
      id: `pin-${i}`,
      title,
      description: `Description for ${title}`,
      image: `/pins/pin${Math.floor(Math.random() * 25) + 1}.jpeg`,
      user: {
        name: userName,
        avatar: `/pins/pin${Math.floor(Math.random() * 25) + 1}.jpeg`,
      },
      width,
      height,
      color,
    });
  }

  return pins;
}
