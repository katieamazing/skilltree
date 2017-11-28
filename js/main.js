var app = new Vue({
  el: "#app",
  data: {
    isIconPanelOpen: false,
    icons: [
      { alt: "flames", src: "imgs/dummyimg.jpg" },
      { alt: "swords", src: "imgs/dummyimg.jpg" }
    ],
    skills: [
      // { img: 0, text: "Be a man", unlocks: [1], x: 100, y: 100 },
      // { img: 0, text: "Swift as a coursing river", unlocks: [2], x: 100, y: 200 },
      // { img: 0, text: "Force of a great typhoon", unlocks: [], x: 100, y: 300 }
    ],
    new_skill: "Add a new skill",
    edges: [
//      {src: 0, dst: 1}, {src: 1, dst: 2}
    ],
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
        this.traverse();
      }
    },
    clearSelection: function () {
      this.current_source = null;
    },
    traverseToFindWidest: function () {
      var seen = [];
      for (var i = 0; i < this.skills.length; i++) {
        this.traverseToFindWidestStartingAt(i, seen, 1);
      }
      console.log(seen);
      var histogram = [];
      for (var j = 0; j < seen.length; j++) {
        var depth = seen[j];
        if (histogram[depth] !== undefined) {
          histogram[depth] = histogram[depth] + 1;
        } else {
          histogram[depth] = 1;
        }
      }
      console.log(histogram);
      var widest = 0;
      for (var k = 1; k < histogram.length; k++) {
          widest = Math.max(widest, histogram[k]);
      }
      return widest;
    },
    traverseToFindWidestStartingAt: function (i, seen, depth) {
      if (seen[i]) {
        return
      } else {
        seen[i] = depth;
        for (var j = 0; j < this.skills[i].unlocks.length; j++) {
          this.traverseToFindWidestStartingAt(this.skills[i].unlocks[j], seen, depth + 1);
        }
      }
    },
    traverse: function () {
      let seen = [];
      for (var i = 0; i < this.skills.length; i++) {
        this.traverseStartingAt(i, seen, 1);
      }
      let width = this.traverseToFindWidest();
      console.log("width is " + width);
    },
    traverseStartingAt: function (i, seen, depth) {
      if (seen[i]) {
        console.log("Base case");
        console.log(seen);
        return
      } else {
        seen[i] = true;
        this.skills[i].y = depth * 100;
        console.log("seen " + i);
        console.log(seen);
        for (var j = 0; j < this.skills[i].unlocks.length; j++) {
          this.traverseStartingAt(this.skills[i].unlocks[j], seen, depth + 1);
        }
      }
    }
  }
})
