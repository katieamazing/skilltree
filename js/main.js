var app = new Vue({
  el: "#app",
  data: {
    isIconPanelOpen: false,
    skills: [
      { img: "icon", text: "Scratch ur bum" }
    ],
    edges: [
    ],
    new_skill: "Add a new skill",
    current_source: null,
    current_icon: null
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
      this.skills.push({img: this.current_icon, text: this.new_skill})
    },
    focusSkill: function (skill_id) {
      if (this.current_source === null) {
        this.current_source = skill_id;
      } else {
        console.log("creating an edge between " + this.current_source + ", " + skill_id);
        this.edges.push({ src: this.current_source, dst: skill_id });
        this.current_source = null;
      }
    },
    clearSelection: function () {
      this.current_source = null;
    }
  }
})
