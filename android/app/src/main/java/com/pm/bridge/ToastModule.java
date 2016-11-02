package com.pm.bridge;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by dashzhao on 10/31/16.
 */

public class ToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        // override getName() return in reactnative import name,
        // for example, import {ToastAndroid} from 'react-native';
        return "AndroidToast";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        // by means of override getConstants()
        // 提供给JS代码中这个模块的常量
        Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        // 使用ReactMethod注解的方法用来给 react native 里的js代码调用
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

}
