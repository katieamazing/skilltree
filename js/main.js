var app = new Vue({
  el: "#app",
  data: {
    isIconPanelOpen: false,
    icons: [
      { alt: "flames", src: "imgs/dummyimg.jpg" },
      { alt: "swords", src: "imgs/dummyimg.jpg" }
    ],
    skills: [
      { img: 0, text: "Be a man", unlocks: [1], x: 100, y: 100 },
      { img: 0, text: "Swift as a coursing river", unlocks: [2], x: 100, y: 200 },
      { img: 0, text: "Force of a great typhoon", unlocks: [], x: 100, y: 300 }
    ],
    new_skill: "Add a new skill",
    edges: [ {src: 0, dst: 1}, {src: 1, dst: 2} ],
    current_source: null,
    current_icon: null,
    width: 800,
    height: 600,
    url: "imgs/dummyimg.jpg"
  },
  methods: {
    openIconPanel: function () {
      this.isIconPanelOpen = true;
    },
    selectSkillIcon: function (icon_id) {
      this.current_icon = icon_id;
      this.isIconPanelOpen = false;
    },
    addSkill: function () {
      this.skills.push({img: this.current_icon, text: this.new_skill, unlocks: [], x: Math.random()*800, y: Math.random()*600});
    },
    focusSkill: function (skill_id) {
      if (this.current_source === null) {
        this.current_source = skill_id;
      } else {
        console.log("creating an edge between " + this.current_source + ", " + skill_id);
        this.skills[this.current_source].unlocks.push(skill_id);
        this.edges.push({src: this.current_source, dst: skill_id});
        this.current_source = null;

      }
    },
    clearSelection: function () {
      this.current_source = null;
    },
    traverse: function () {
      let seen = [];
      for (var i = 0; i < this.skills.length; i++) {
        this.traverseStartingAt(i, seen);
      }
    },
    traverseStartingAt: function (i, seen) {
      if (seen[i]) {
        console.log("Base case");
        console.log(seen);
        return
      } else {
        seen[i] = true;
        console.log("seen " + i);
        console.log(seen);
        for (var j = 0; j < this.skills[i].unlocks.length; j++) {
          this.traverseStartingAt(j, seen);
        }
      }
    }
  }
})
