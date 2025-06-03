// Portfolio year update
if (document.getElementById("intro")) {
  document.getElementById("intro").textContent = "Portfolio " + new Date().getFullYear();
}

// Songs data
var songs = [
  { title: "Wrong", artist: "Lui Khel", path: "Audio/Worng.mp3", image: "SongsImage/worng.jpg" },
  { title: "Closer", artist: "The Chainsmoker", path: "Audio/Closer.mp3", image: "SongsImage/Closer.jpg" },
  { title: "Perfect", artist: "Ed Sheeran", path: "Audio/Perfect.mp3", image: "SongsImage/Perfect.jpg" },
  { title: "Night Changes", artist: "One Direction", path: "Audio/NightChanges.mp3", image: "SongsImage/Night Changes.jpg" },
  { title: "Bardali", artist: "Sushant KC", path: "Audio/Bardali.mp3", image: "SongsImage/Bardali.jpg" },
  { title: "Dil Se Dil Tak", artist: "Laqshay Kapoor", path: "Audio/DilSeDilTak.mp3", image: "SongsImage/Dil Se DIl Tak.jpg" },
  { title: "O Mahi", artist: "Arjit Singh", path: "Audio/Omahi.mp3", image: "SongsImage/O Mahi.jpg" },
  { title: "AMSTERDAM", artist: "JAMESY", path: "Audio/GermanGadi.mp3", image: "SongsImage/AMSTERDAM.jpg" },
  { title: "favorite", artist: "Isabel LaRosa", path: "Audio/Favroute.mp3", image: "SongsImage/favorite.jpg" },
  { title: "Girls Like You", artist: "Maroon 5", path: "Audio/Girls.mp3", image: "SongsImage/Girls Like You.jpg" },
  { title: "Unstoppable", artist: "Sia", path: "Audio/Unstoppable.mp3", image: "SongsImage/Unstopable.jpg" },
  { title: "Aankhon Se Batana", artist: "Dikshant", path: "Audio/Aankhon Se Batana.mp3", image: "SongsImage/AnkhoSeBata.jpg" },
  { title: "Scars To Your Beautiful", artist: "Alessia Cara", path: "Audio/Scars To Your Beautiful.mp3", image: "SongsImage/Scars2Beautiful.jpeg" },
  { title: "Chaina saram", artist: "ZENISH", path: "Audio/Chaina saram.mp3", image: "SongsImage/ChainaSaram.jpg" },
  { title: "MIDDLE OF THE NIGHT", artist: "Elley Duhé", path: "Audio/MIDDLE OF THE NIGHT.mp3", image: "SongsImage/MiddleOfTheNight.jpg" },
  { title: "I AM THE ONE", artist: "Justin Biber", path: "Audio/I AM THE ONE.mp3", image: "SongsImage/IamTheOne.jpg" }
];

// Message data
var messages = [
  "I make cool things with code, like building digital magic! ✨💻",
  "I turn coffee into code, because that's how I get my superpowers! ☕⚡",
  "When I write code, I'm creating little adventures on the screen! 🎮💻",
  "Code is like a puzzle, and I love solving it! 🧩👨‍💻",
  "I build things that make people smile, one line of code at a time! 😊💻"
];
var currentMessageIndex = 0;
var currentCharIndex = 0;
var isDeleting = false;
var uniformSpeed = 100;
var pauseTime = 3000;

// Simple AOS (Animate On Scroll) Implementation
document.addEventListener("DOMContentLoaded", function() {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate");
      }
    });
  }, observerOptions);

  var elements = document.querySelectorAll("[data-aos]");
  if (elements.length > 0) {
    for (var i = 0; i < elements.length; i++) {
      observer.observe(elements[i]);
    }
  }

  // Update current year
  if (document.getElementById("current-year")) {
    document.getElementById("current-year").textContent = new Date().getFullYear();
  }
  
  // Initialize music player
  initMusicPlayer();
});

// Disable right-click
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener("keydown", function(e) {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
    (e.ctrlKey && e.key === "U") ||
    (e.ctrlKey && e.shiftKey && e.key === "C")
  ) {
    e.preventDefault();
  }
});

// Music player initialization
function initMusicPlayer() {
  console.log("Ninja Music player initializing");
  
  // Select all music player elements
  var audio = new Audio();
  var playBtn = document.getElementById('play-btn');
  var prevBtn = document.getElementById('prev-btn');
  var nextBtn = document.getElementById('next-btn');
  var shuffleBtn = document.getElementById('shuffle-btn');
  var repeatBtn = document.getElementById('repeat-btn');
  var volumeSlider = document.getElementById('volume-slider');
  var volumeLevel = document.getElementById('volume-level');
  var progressBar = document.getElementById('progress-bar');
  var progressContainer = document.getElementById('progress-container');
  var currentTimeSpan = document.getElementById('current-time');
  var durationSpan = document.getElementById('duration');
  var playlist = document.getElementById('playlist');
  var songTitle = document.getElementById('current-song-title');
  var songArtist = document.getElementById('current-song-artist');
  var songImage = document.getElementById('current-song-image');
  var defaultIcon = document.getElementById('default-icon');
  
  console.log("Ninja controls found:", {
    play: !!playBtn,
    prev: !!prevBtn,
    next: !!nextBtn,
    shuffle: !!shuffleBtn,
    repeat: !!repeatBtn
  });

  // Check if we found essential elements
  if (!playBtn) {
    console.error("Critical music player elements missing");
    return;
  }

  // Update song count display
  var songCountElement = document.getElementById('song-count');
  if (songCountElement) {
    songCountElement.textContent = songs.length;
  }
  
  // State variables
  var currentSongIndex = 0;
  var isPlaying = false;
  var isShuffled = false;
  var isRepeating = false;

  // Populate playlist
  if (playlist) {
    playlist.innerHTML = '';
    for (var i = 0; i < songs.length; i++) {
      var song = songs[i];
      var songItem = document.createElement('div');
      songItem.className = 'song-item flex items-center gap-4 cursor-pointer group p-2 hover:bg-black/20 rounded';
      songItem.innerHTML = 
        '<div class="w-10 h-10">' +
        '<img src="' + song.image + '" alt="' + song.title + '" class="w-full h-full object-cover rounded">' +
        '</div>' +
        '<div class="flex-1 min-w-0">' +
        '<h4 class="font-medium truncate group-hover:text-[#FF7800] transition-colors">' + song.title + '</h4>' +
        '<p class="text-sm text-gray-400 truncate">' + song.artist + '</p>' +
        '</div>' +
        '<div class="opacity-0 group-hover:opacity-100 transition-opacity">' +
        '<i class="ri-play-fill text-[#FF7800]"></i>' +
        '</div>';
      
      // Use closure to capture the index
      (function(index) {
        songItem.onclick = function() {
          loadAndPlaySong(index);
        };
      })(i);
      
      playlist.appendChild(songItem);
    }
  }

  function loadAndPlaySong(index) {
    console.log("Loading song at index:", index);
    currentSongIndex = index;
    var song = songs[currentSongIndex];
    
    try {
      audio.src = song.path;
      
      if (songTitle) songTitle.textContent = song.title;
      if (songArtist) songArtist.textContent = song.artist;
      
      if (songImage && defaultIcon) {
        songImage.src = song.image;
        songImage.style.opacity = '1';
        defaultIcon.style.opacity = '0';
      }
      
      var songItems = document.querySelectorAll('.song-item');
      for (var i = 0; i < songItems.length; i++) {
        if (i === index) {
          songItems[i].classList.add('bg-black/20');
          songItems[i].classList.add('border-l-2');
          songItems[i].classList.add('border-[#FF7800]');
        } else {
          songItems[i].classList.remove('bg-black/20');
          songItems[i].classList.remove('border-l-2');
          songItems[i].classList.remove('border-[#FF7800]');
        }
      }
  
      playAudio();
    } catch (error) {
      console.error("Error loading song:", error);
    }
  }

  function playAudio() {
    console.log("Attempting to play audio");
    try {
      var playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.then(function() {
          console.log("Audio playback started");
          isPlaying = true;
          if (playBtn) {
            var icon = playBtn.querySelector('i');
            if (icon) icon.className = 'ri-pause-fill text-2xl';
          }
        }).catch(function(error) {
          console.error("Playback error:", error);
          pauseAudio();
        });
      }
    } catch (e) {
      console.error("Error playing audio:", e);
    }
  }

  function pauseAudio() {
    console.log("Pausing audio");
    audio.pause();
    isPlaying = false;
    if (playBtn) {
      var icon = playBtn.querySelector('i');
      if (icon) icon.className = 'ri-play-fill text-2xl';
    }
  }

  // Set up event listeners with direct 'onclick' property for better compatibility
  if (playBtn) {
    playBtn.onclick = function() {
      console.log("Play button clicked");
      if (!audio.src && songs.length > 0) {
        loadAndPlaySong(0);
      } else if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    };
  }

  if (prevBtn) {
    prevBtn.onclick = function() {
      console.log("Previous button clicked");
      if (isShuffled) {
        var newIndex = Math.floor(Math.random() * songs.length);
        while (newIndex === currentSongIndex && songs.length > 1) {
          newIndex = Math.floor(Math.random() * songs.length);
        }
        loadAndPlaySong(newIndex);
      } else {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadAndPlaySong(currentSongIndex);
      }
    };
  }

  if (nextBtn) {
    nextBtn.onclick = function() {
      console.log("Next button clicked");
      if (isShuffled) {
        var newIndex = Math.floor(Math.random() * songs.length);
        while (newIndex === currentSongIndex && songs.length > 1) {
          newIndex = Math.floor(Math.random() * songs.length);
        }
        loadAndPlaySong(newIndex);
      } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadAndPlaySong(currentSongIndex);
      }
    };
  }

  if (shuffleBtn) {
    shuffleBtn.onclick = function() {
      console.log("Shuffle button clicked");
      isShuffled = !isShuffled;
      if (isShuffled) {
        shuffleBtn.classList.add('text-[#FF7800]');
      } else {
        shuffleBtn.classList.remove('text-[#FF7800]');
      }
    };
  }

  if (repeatBtn) {
    repeatBtn.onclick = function() {
      console.log("Repeat button clicked");
      isRepeating = !isRepeating;
      if (isRepeating) {
        repeatBtn.classList.add('text-[#52D1DC]');
      } else {
        repeatBtn.classList.remove('text-[#52D1DC]');
      }
    };
  }

  if (volumeSlider) {
    volumeSlider.oninput = function() {
      updateVolume(this.value / 100);
    };
  }

  if (progressContainer) {
    progressContainer.onclick = function(e) {
      var clickPosition = e.offsetX / this.offsetWidth;
      audio.currentTime = clickPosition * audio.duration;
    };
  }

  // Audio event listeners
  audio.addEventListener('timeupdate', function() {
    if (audio.duration) {
      var progress = (audio.currentTime / audio.duration) * 100;
      if (progressBar) progressBar.style.width = progress + "%";
      if (currentTimeSpan) currentTimeSpan.textContent = formatTime(audio.currentTime);
    }
  });

  audio.addEventListener('loadedmetadata', function() {
    if (durationSpan) durationSpan.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', function() {
    if (isRepeating) {
      audio.currentTime = 0;
      playAudio();
    } else if (nextBtn) {
      nextBtn.click();
    }
  });

  audio.addEventListener('error', function(e) {
    console.error("Audio error:", e);
    // Try to recover by playing next song
    if (nextBtn) nextBtn.click();
  });

  // Helper functions
  function updateVolume(value) {
    audio.volume = value;
    if (volumeSlider) volumeSlider.value = value * 100;
    if (volumeLevel) volumeLevel.style.width = value * 100 + "%";
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
    
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
  }

  // Set initial volume
  updateVolume(0.5);
  
  console.log("Ninja music player initialization complete");
}