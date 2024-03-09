import { CommandInteraction, Constants, Client as Eris } from "eris";
import { isNumericLiteral } from "typescript";

const bot = new Eris(process.env.TOKEN!, {
  intents: [
    Constants.Intents.guilds
  ]
});

bot.on('ready', async () => {

  await bot.createCommand({
    name: "run",
    description: "Runs the ticketing pop-up",
    type: 1
  });

  console.log("Ready?");
});

bot.on('interactionCreate', async (interaction) => {
  if (interaction.type == 3) {
    //@ts-ignore
    switch (interaction.data!.custom_id) {
      case "add":
        await interaction.createMessage("Add ticket");
        break;
      case "del":
        await interaction.createMessage("Delete ticket");
        break;
      case "rename":
        await interaction.createMessage("Rename ticket");
    }
  }
  else if (interaction.type == 2) {
    //@ts-ignore
    if (interaction.data.name! == "run") {
      await interaction.createMessage({
        allowedMentions: {
          repliedUser: false
        },
        embeds: [
          {
            title: "Create a ticket",
            description: "Choose one of the options given below",
          }
        ],
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: "Add",
                style: 1,
                custom_id: "add"
              }, {
                type: 2,
                label: "Delete",
                style: 4,
                custom_id: "del"
              }, {
                type: 2,
                label: "Rename",
                style: 2,
                custom_id: "rename"
              }
            ]
          }
        ]
      })
    }

  }
})

bot.connect();
