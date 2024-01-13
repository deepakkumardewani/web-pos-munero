<template>
  <div class="tw-flex tw-justify-center tw-items-center">
    <v-card
      variant="elevated"
      rounded="xl"
      min-width="400"
      min-height="400"
      class="text-center"
    >
      <v-card-text>
        <div class="tw-flex tw-justify-center tw-items-center tw-my-5">
          <img
            class="tw-h-14 tw-w-14"
            src="@/assets/munero-logo.png"
            alt="munero-logo"
          />
        </div>

        <div class="tw-text-3xl tw-my-5 tw-font-bold">Welcome Back</div>

        <div class="login-fields">
          <v-text-field
            v-model="username"
            label="Username"
            placeholder="Username"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            placeholder="Password"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
        </div>

        <div class="tw-w-full tw-h-[1px] tw-bg-gray-400"></div>

        <div class="tw-my-5">
          <v-btn
            :disabled="!username || !password"
            @click="signIn()"
            :loading="loading"
            block
            color="indigo-darken-3"
            >Sign In</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
